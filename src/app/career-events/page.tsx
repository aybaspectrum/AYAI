"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { api } from "~/trpc/react";
import { CareerEventType } from "@prisma/client";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { useToast } from "~/hooks/use-toast";
import { Loader2, Plus, Calendar, Building, User, FileText, Trash2, Briefcase, GraduationCap, Star, Upload } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
// import { Badge } from "~/components/ui/badge";
import { CareerEventCard } from "~/components/ui/career-event-card";

export default function CareerEventsPage() {
  const { data: session } = useSession();
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    type: CareerEventType.JOB,
    title: "",
    organization: "",
    description: "",
    startDate: "",
    endDate: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { toast } = useToast();

  // tRPC queries and mutations
  const {
    data: careerEvents,
    refetch,
    isLoading: isCareerEventsLoading,
    error,
  } = api.careerEvent.getAll.useQuery(
    undefined,
    {
      enabled: !!session,
    },
  );
  const createCareerEventMutation = api.careerEvent.create.useMutation();
  const deleteCareerEventMutation = api.careerEvent.delete.useMutation();

  // Upload state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const uploadFileMutation = api.upload.uploadFile.useMutation();
  const processFileMutation = api.upload.processFile.useMutation();

  // Upload handlers
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file ?? null);
  };

  const handleUploadSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload.",
        variant: "destructive",
      });
      return;
    }
    setIsUploading(true);
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onload = async () => {
      const result = reader.result;
      const base64Content = typeof result === "string" ? result.split(",")[1] : undefined;
      if (!base64Content) {
        toast({
          title: "Error reading file",
          description: "Could not read file content.",
          variant: "destructive",
        });
        setIsUploading(false);
        return;
      }
      try {
        const uploadResult = await uploadFileMutation.mutateAsync({
          fileName: selectedFile.name,
          fileContent: base64Content,
          fileType: selectedFile.type,
        });
        toast({
          title: "Upload successful!",
          description: `File uploaded to: ${uploadResult.url}`,
        });
        const processResult = await processFileMutation.mutateAsync({
          blobUrl: uploadResult.url,
        });
        toast({
          title: "Processing complete!",
          description: `Imported ${processResult.importedCount} career events.`,
        });
        setSelectedFile(null);
        await refetch();
      } catch (error) {
        toast({
          title: "Operation failed",
          description: "Failed to upload or process file.",
          variant: "destructive",
        });
      } finally {
        setIsUploading(false);
      }
    };
    reader.onerror = (error) => {
      toast({
        title: "File read error",
        description: "Failed to read the selected file.",
        variant: "destructive",
      });
      setIsUploading(false);
    };
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.organization.trim())
      newErrors.organization = "Organization is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.startDate) newErrors.startDate = "Start date is required";
    if (
      formData.endDate &&
      formData.startDate &&
      new Date(formData.endDate) < new Date(formData.startDate)
    ) {
      newErrors.endDate = "End date must be after start date";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form.",
        variant: "destructive",
      });
      return;
    }

    setIsFormSubmitting(true);
    setErrors({});

    try {
      await createCareerEventMutation.mutateAsync({
        type: formData.type,
        title: formData.title,
        organization: formData.organization,
        description: formData.description,
        startDate: new Date(formData.startDate),
        endDate: formData.endDate ? new Date(formData.endDate) : undefined,
      });
      setFormData({
        type: CareerEventType.JOB,
        title: "",
        organization: "",
        description: "",
        startDate: "",
        endDate: "",
      });
      setShowForm(false);
      await refetch();
      toast({ title: "Success!", description: "Career event added." });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create event.",
        variant: "destructive",
      });
    } finally {
      setIsFormSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleDelete = async (eventId: string, eventTitle: string) => {
    if (!confirm(`Are you sure you want to delete "${eventTitle}"?`)) return;
    try {
      await deleteCareerEventMutation.mutateAsync({ id: eventId });
      await refetch();
      toast({ title: "Success!", description: "Career event deleted." });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete event.",
        variant: "destructive",
      });
    }
  };

  if (!session) {
    return (
      <div className="container py-12 text-center">
        <Card className="mx-auto max-w-md">
          <CardHeader>
            <CardTitle>Please Log In</CardTitle>
            <CardDescription>
              You need to be logged in to manage your career events.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/login">
              <Button>Go to Login</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isCareerEventsLoading) {
    return (
      <div className="container py-12 text-center">
        <Card className="mx-auto max-w-md">
          <CardHeader>
            <CardTitle>Loading Career Events...</CardTitle>
            <CardDescription>
              <span className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </span>
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-12 text-center">
        <Card className="mx-auto max-w-md">
          <CardHeader>
            <CardTitle>Error Loading Career Events</CardTitle>
            <CardDescription>
              {error.message || "An error occurred while fetching your career events."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => window.location.reload()}>Retry</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const jobs =
    careerEvents?.filter((event) => event.type === CareerEventType.JOB) ?? [];
  const education =
    careerEvents?.filter((event) => event.type === CareerEventType.EDUCATION) ??
    [];
  const skills =
    careerEvents?.filter(
      (event) =>
        event.type === CareerEventType.PROJECT ||
        event.type === CareerEventType.ACCOMPLISHMENT,
    ) ?? [];

  return (
    <div className="container mx-auto flex flex-col items-center justify-center py-12">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold">Career Events</h1>
          <p className="text-muted-foreground mt-1">
            Manage your professional timeline
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => setShowForm(!showForm)}
            variant={showForm ? "outline" : "default"}
          >
            <Plus className="mr-2 h-4 w-4" />
            {showForm ? "Cancel" : "Add New Event"}
          </Button>
          <form onSubmit={handleUploadSubmit} className="flex items-center gap-2">
            <label htmlFor="career-upload" className="sr-only">Upload File</label>
            <Input
              id="career-upload"
              type="file"
              accept=".csv,.pdf,.doc,.docx,.txt"
              onChange={handleFileChange}
              className="max-w-xs"
            />
            <Button type="submit" disabled={isUploading || !selectedFile}>
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Import Events
                </>
              )}
            </Button>
          </form>
        </div>
      </div>

      {showForm && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Add New Career Event</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 gap-6 md:grid-cols-2"
            >
              <div className="space-y-2">
                <Label htmlFor="type">
                  <User className="mr-2 inline h-4 w-4" />
                  Type *
                </Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => handleSelectChange("type", value)}
                >
                  <SelectTrigger
                    className={errors.type ? "border-destructive" : ""}
                  >
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(CareerEventType).map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.type && (
                  <p className="text-destructive text-sm">{errors.type}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">
                  <FileText className="mr-2 inline h-4 w-4" />
                  Title *
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Senior Software Engineer"
                  className={errors.title ? "border-destructive" : ""}
                />
                {errors.title && (
                  <p className="text-destructive text-sm">{errors.title}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="organization">
                  <Building className="mr-2 inline h-4 w-4" />
                  Organization *
                </Label>
                <Input
                  id="organization"
                  name="organization"
                  value={formData.organization}
                  onChange={handleInputChange}
                  placeholder="e.g., Google"
                  className={errors.organization ? "border-destructive" : ""}
                />
                {errors.organization && (
                  <p className="text-destructive text-sm">
                    {errors.organization}
                  </p>
                )}
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">
                  <FileText className="mr-2 inline h-4 w-4" />
                  Description *
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Describe your role, responsibilities..."
                  className={errors.description ? "border-destructive" : ""}
                />
                {errors.description && (
                  <p className="text-destructive text-sm">
                    {errors.description}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="startDate">
                  <Calendar className="mr-2 inline h-4 w-4" />
                  Start Date *
                </Label>
                <Input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className={errors.startDate ? "border-destructive" : ""}
                />
                {errors.startDate && (
                  <p className="text-destructive text-sm">{errors.startDate}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="endDate">
                  <Calendar className="mr-2 inline h-4 w-4" />
                  End Date (optional)
                </Label>
                <Input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className={errors.endDate ? "border-destructive" : ""}
                />
                {errors.endDate && (
                  <p className="text-destructive text-sm">{errors.endDate}</p>
                )}
              </div>

              <div className="flex justify-end space-x-4 md:col-span-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isFormSubmitting}>
                  {isFormSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Career Event"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

  <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
  <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Briefcase className="text-primary h-6 w-6" />
            <h2 className="text-lg font-semibold">Jobs</h2>
          </div>
          {jobs.length > 0 ? (
            jobs.map((event) => (
              <div key={event.id} className="group relative max-w-xs mx-auto">
                <CareerEventCard event={event} />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-4 right-4 opacity-0 transition-opacity group-hover:opacity-100"
                  onClick={() => handleDelete(event.id, event.title)}
                  disabled={deleteCareerEventMutation.isPending}
                >
                  {deleteCareerEventMutation.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                </Button>
              </div>
            ))
          ) : (
            <p className="text-muted-foreground">No job events yet.</p>
          )}
        </div>

  <div className="space-y-3">
          <div className="flex items-center gap-2">
            <GraduationCap className="text-primary h-6 w-6" />
            <h2 className="text-lg font-semibold">Education</h2>
          </div>
          {education.length > 0 ? (
            education.map((event) => (
              <div key={event.id} className="group relative max-w-xs mx-auto">
                <CareerEventCard event={event} />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-4 right-4 opacity-0 transition-opacity group-hover:opacity-100"
                  onClick={() => handleDelete(event.id, event.title)}
                  disabled={deleteCareerEventMutation.isPending}
                >
                  {deleteCareerEventMutation.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                </Button>
              </div>
            ))
          ) : (
            <p className="text-muted-foreground">No education events yet.</p>
          )}
        </div>

  <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Star className="text-primary h-6 w-6" />
            <h2 className="text-lg font-semibold">Skills & Projects</h2>
          </div>
          {skills.length > 0 ? (
            skills.map((event) => (
              <div key={event.id} className="group relative max-w-xs mx-auto">
                <CareerEventCard event={event} />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-4 right-4 opacity-0 transition-opacity group-hover:opacity-100"
                  onClick={() => handleDelete(event.id, event.title)}
                  disabled={deleteCareerEventMutation.isPending}
                >
                  {deleteCareerEventMutation.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                </Button>
              </div>
            ))
          ) : (
            <p className="text-muted-foreground">No skills or projects yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}