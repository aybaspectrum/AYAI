"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { api } from "~/trpc/react";
import { Timeline } from "~/components/ui/timeline";
import { BackgroundBeams } from "~/components/ui/background-beams";
import { Button } from "~/components/ui/button";
import { useToast } from "~/hooks/use-toast";
import { CareerEventType } from "@prisma/client";
import { Trash2, Loader2, Plus } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";

export default function TimelinePage() {
  const { data: session } = useSession();
  const { data: careerEvents, refetch } = api.careerEvent.getAll.useQuery(undefined, {
    enabled: !!session,
  });
  const deleteCareerEventMutation = api.careerEvent.delete.useMutation();
  const { toast } = useToast();

  if (!session) {
    return (
      <div className="container py-12 text-center">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Please Log In</CardTitle>
            <CardDescription>You need to be logged in to view your timeline.</CardDescription>
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

  const getBadgeVariant = (type: CareerEventType) => {
    switch (type) {
      case CareerEventType.JOB: return "default";
      case CareerEventType.PROJECT: return "secondary";
      case CareerEventType.EDUCATION: return "outline";
      default: return "secondary";
    }
  };

  const timelineData = careerEvents?.map((event) => ({
    title: new Date(event.startDate).getFullYear().toString(),
    content: (
      <Card>
        <CardHeader className="flex flex-row justify-between items-start">
          <div>
            <CardTitle>{event.title}</CardTitle>
            <CardDescription>{event.organization}</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={getBadgeVariant(event.type)}>{event.type}</Badge>
            <Button variant="ghost" size="icon" onClick={() => handleDelete(event.id, event.title)} disabled={deleteCareerEventMutation.isPending}>
              {deleteCareerEventMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4 text-destructive" />}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-3">{event.description}</p>
          <p className="text-sm text-muted-foreground">
            {new Date(event.startDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} - {" "}
            {event.endDate ? new Date(event.endDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : "Present"}
          </p>
        </CardContent>
      </Card>
    ),
  })) ?? [];

  return (
    <div className="relative min-h-screen">
      <BackgroundBeams />
      <div className="container relative z-10 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold">Professional Timeline</h1>
          <p className="text-muted-foreground mt-2">Your career journey visualized</p>
        </div>

        {timelineData.length > 0 ? (
          <Timeline data={timelineData} />
        ) : (
          <Card className="max-w-2xl mx-auto text-center">
            <CardHeader>
              <CardTitle>Your Timeline is Empty</CardTitle>
              <CardDescription>
                Add some career events to see your professional timeline come to life!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/career-events">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Event
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
