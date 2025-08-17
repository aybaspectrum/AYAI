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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { TextGenerateEffect } from "~/components/ui/text-generate-effect";
import { useToast } from "~/hooks/use-toast";
import { Loader2, Plus, Calendar, Building, User, FileText, Trash2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";

export default function CareerEventsPage() {
  const { data: session } = useSession();
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
  const { data: careerEvents, refetch } = api.careerEvent.getAll.useQuery(undefined, {
    enabled: !!session,
  });
  const createCareerEventMutation = api.careerEvent.create.useMutation();
  const deleteCareerEventMutation = api.careerEvent.delete.useMutation();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.organization.trim()) newErrors.organization = "Organization is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.startDate) newErrors.startDate = "Start date is required";
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
        description: "Please fix the errors in the form.",
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
      setFormData({ type: CareerEventType.JOB, title: "", organization: "", description: "", startDate: "", endDate: "" });
      setShowForm(false);
      await refetch();
      toast({ title: "Success!", description: "Career event added." });
    } catch (error) {
      console.error("Error creating career event:", error);
      toast({ title: "Error", description: "Failed to create event.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleDelete = async (eventId: string, eventTitle: string) => {
    if (!confirm(`Are you sure you want to delete "${eventTitle}"?`)) return;
    try {
      await deleteCareerEventMutation.mutateAsync({ id: eventId });
      await refetch();
      toast({ title: "Success!", description: "Career event deleted." });
    } catch (error) {
      console.error("Error deleting career event:", error);
      toast({ title: "Error", description: "Failed to delete event.", variant: "destructive" });
    }
  };

  if (!session) {
    return (
      <div className="container py-12 text-center">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Please Log In</CardTitle>
            <CardDescription>You need to be logged in to manage your career events.</CardDescription>
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

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Career Events</h1>
          <p className="text-muted-foreground mt-1">Manage your professional timeline</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} variant={showForm ? "outline" : "default"}>
          <Plus className="w-4 h-4 mr-2" />
          {showForm ? "Cancel" : "Add New Event"}
        </Button>
      </div>

      {showForm && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Add New Career Event</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="type"><User className="inline w-4 h-4 mr-2" />Type *</Label>
                <Select value={formData.type} onValueChange={(value) => handleSelectChange("type", value)}>
                  <SelectTrigger className={errors.type ? "border-destructive" : ""}>
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(CareerEventType).map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
                  </SelectContent>
                </Select>
                {errors.type && <p className="text-sm text-destructive">{errors.type}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="title"><FileText className="inline w-4 h-4 mr-2" />Title *</Label>
                <Input id="title" name="title" value={formData.title} onChange={handleInputChange} placeholder="e.g., Senior Software Engineer" className={errors.title ? "border-destructive" : ""} />
                {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="organization"><Building className="inline w-4 h-4 mr-2" />Organization *</Label>
                <Input id="organization" name="organization" value={formData.organization} onChange={handleInputChange} placeholder="e.g., Google" className={errors.organization ? "border-destructive" : ""} />
                {errors.organization && <p className="text-sm text-destructive">{errors.organization}</p>}
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description"><FileText className="inline w-4 h-4 mr-2" />Description *</Label>
                <Textarea id="description" name="description" value={formData.description} onChange={handleInputChange} rows={4} placeholder="Describe your role, responsibilities..." className={errors.description ? "border-destructive" : ""} />
                {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="startDate"><Calendar className="inline w-4 h-4 mr-2" />Start Date *</Label>
                <Input type="date" id="startDate" name="startDate" value={formData.startDate} onChange={handleInputChange} className={errors.startDate ? "border-destructive" : ""} />
                {errors.startDate && <p className="text-sm text-destructive">{errors.startDate}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="endDate"><Calendar className="inline w-4 h-4 mr-2" />End Date (optional)</Label>
                <Input type="date" id="endDate" name="endDate" value={formData.endDate} onChange={handleInputChange} className={errors.endDate ? "border-destructive" : ""} />
                {errors.endDate && <p className="text-sm text-destructive">{errors.endDate}</p>}
              </div>

              <div className="md:col-span-2 flex justify-end space-x-4">
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Saving...</> : "Save Career Event"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Your Career Events</CardTitle>
        </CardHeader>
        <CardContent>
          {careerEvents && careerEvents.length > 0 ? (
            <div className="space-y-4">
              {careerEvents.map((event) => (
                <Card key={event.id}>
                  <CardHeader className="flex flex-row justify-between items-start">
                    <div>
                      <CardTitle>{event.title}</CardTitle>
                      <CardDescription>{event.organization}</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{event.type}</Badge>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(event.id, event.title)} disabled={deleteCareerEventMutation.isPending}>
                        {deleteCareerEventMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4 text-destructive" />}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-3">{event.description}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(event.startDate).toLocaleDateString()} - {event.endDate ? new Date(event.endDate).toLocaleDateString() : "Present"}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No career events yet.</p>
              <p className="text-sm text-muted-foreground mt-2">Add your first career event to get started!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
