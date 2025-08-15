"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "~/trpc/react";
import { CareerEventType } from "@prisma/client";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { TextGenerateEffect } from "~/components/ui/text-generate-effect";
import { useToast } from "~/hooks/use-toast";
import { Loader2, Plus, Calendar, Building, User, FileText } from "lucide-react";

export default function CareerEventsPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
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
  const { data: careerEvents, refetch } = api.careerEvent.getAll.useQuery();
  const createCareerEventMutation = api.careerEvent.create.useMutation();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    if (!formData.organization.trim()) {
      newErrors.organization = "Organization is required";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }
    if (!formData.startDate) {
      newErrors.startDate = "Start date is required";
    }
    if (formData.endDate && formData.startDate && new Date(formData.endDate) < new Date(formData.startDate)) {
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
        description: "Please fix the errors in the form before submitting.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
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

      // Reset form and hide it
      setFormData({
        type: CareerEventType.JOB,
        title: "",
        organization: "",
        description: "",
        startDate: "",
        endDate: "",
      });
      setShowForm(false);

      // Refetch the career events list
      await refetch();

      toast({
        title: "Success!",
        description: "Career event added successfully.",
      });
    } catch (error) {
      console.error("Error creating career event:", error);
      toast({
        title: "Error",
        description: "Failed to create career event. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user makes selection
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please log in first</h1>
          <Link href="/login" className="text-blue-600 hover:underline">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <TextGenerateEffect
                words="Career Events"
                className="text-3xl font-bold text-gray-900"
              />
              <p className="text-gray-600 mt-2">Manage your professional timeline</p>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-gray-600 hover:text-gray-900">
                ← Back to Home
              </Link>
              <span className="text-gray-600">|</span>
              <Link href="/timeline" className="text-blue-600 hover:text-blue-800 font-medium">
                View Timeline
              </Link>
              <span className="text-gray-600">|</span>
              <span className="text-gray-600">Welcome, {session.user?.name}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Add New Event Button */}
        <div className="mb-8">
          <Button
            onClick={() => setShowForm(!showForm)}
            variant={showForm ? "outline" : "default"}
            size="lg"
          >
            {showForm ? (
              "Cancel"
            ) : (
              <>
                <Plus className="w-4 h-4 mr-2" />
                Add New Career Event
              </>
            )}
          </Button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-6">Add New Career Event</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Type */}
              <div className="space-y-2">
                <Label htmlFor="type" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Type *
                </Label>
                <Select value={formData.type} onValueChange={(value) => handleSelectChange("type", value)}>
                  <SelectTrigger className={errors.type ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={CareerEventType.JOB}>Job</SelectItem>
                    <SelectItem value={CareerEventType.PROJECT}>Project</SelectItem>
                    <SelectItem value={CareerEventType.EDUCATION}>Education</SelectItem>
                    <SelectItem value={CareerEventType.ACCOMPLISHMENT}>Accomplishment</SelectItem>
                  </SelectContent>
                </Select>
                {errors.type && <p className="text-sm text-red-500">{errors.type}</p>}
              </div>

              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title" className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Title *
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Senior Software Engineer"
                  className={errors.title ? "border-red-500" : ""}
                />
                {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
              </div>

              {/* Organization */}
              <div className="space-y-2">
                <Label htmlFor="organization" className="flex items-center gap-2">
                  <Building className="w-4 h-4" />
                  Organization *
                </Label>
                <Input
                  id="organization"
                  name="organization"
                  value={formData.organization}
                  onChange={handleInputChange}
                  placeholder="e.g., Google, Stanford University"
                  className={errors.organization ? "border-red-500" : ""}
                />
                {errors.organization && <p className="text-sm text-red-500">{errors.organization}</p>}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Description *
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Describe your role, responsibilities, achievements..."
                  className={errors.description ? "border-red-500" : ""}
                />
                {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
              </div>

              {/* Start Date */}
              <div className="space-y-2">
                <Label htmlFor="startDate" className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Start Date *
                </Label>
                <Input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className={errors.startDate ? "border-red-500" : ""}
                />
                {errors.startDate && <p className="text-sm text-red-500">{errors.startDate}</p>}
              </div>

              {/* End Date */}
              <div className="space-y-2">
                <Label htmlFor="endDate" className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  End Date (optional)
                </Label>
                <Input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className={errors.endDate ? "border-red-500" : ""}
                />
                {errors.endDate && <p className="text-sm text-red-500">{errors.endDate}</p>}
                <p className="text-sm text-muted-foreground">Leave empty if this is your current position</p>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Career Event"
                  )}
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Career Events List */}
        <div className="bg-white rounded-lg shadow-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold">Your Career Events</h2>
          </div>
          
          <div className="p-6">
            {careerEvents && careerEvents.length > 0 ? (
              <div className="space-y-6">
                {careerEvents.map((event) => (
                  <div key={event.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
                        <p className="text-gray-600">{event.organization}</p>
                      </div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {event.type}
                      </span>
                    </div>
                    
                    <p className="text-gray-700 mb-3">{event.description}</p>
                    
                    <div className="text-sm text-gray-500">
                      <span>
                        {new Date(event.startDate).toLocaleDateString()} - {" "}
                        {event.endDate ? new Date(event.endDate).toLocaleDateString() : "Present"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No career events yet</p>
                <p className="text-gray-400 mt-2">Add your first career event to get started!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
