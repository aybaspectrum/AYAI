"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { api } from "~/trpc/react";
import { Timeline } from "~/components/ui/timeline";
import { TextGenerateEffect } from "~/components/ui/text-generate-effect";
import { BackgroundBeams } from "~/components/ui/background-beams";
import { Button } from "~/components/ui/button";
import { useToast } from "~/hooks/use-toast";
import { CareerEventType } from "@prisma/client";
import { Trash2, Loader2 } from "lucide-react";

export default function TimelinePage() {
  const { data: session } = useSession();
  const { data: careerEvents, refetch } = api.careerEvent.getAll.useQuery();
  const deleteCareerEventMutation = api.careerEvent.delete.useMutation();
  const { toast } = useToast();

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

  const handleDelete = async (eventId: string, eventTitle: string) => {
    if (!confirm(`Are you sure you want to delete "${eventTitle}"? This action cannot be undone.`)) {
      return;
    }

    try {
      await deleteCareerEventMutation.mutateAsync({ id: eventId });
      await refetch();
      toast({
        title: "Success!",
        description: "Career event deleted successfully.",
      });
    } catch (error) {
      console.error("Error deleting career event:", error);
      toast({
        title: "Error",
        description: "Failed to delete career event. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Transform career events into timeline data
  const timelineData = careerEvents?.map((event) => ({
    title: new Date(event.startDate).getFullYear().toString(),
    content: (
      <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700">
        <div className="flex items-center justify-between mb-3">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            event.type === CareerEventType.JOB ? 'bg-blue-100 text-blue-800' :
            event.type === CareerEventType.PROJECT ? 'bg-green-100 text-green-800' :
            event.type === CareerEventType.EDUCATION ? 'bg-purple-100 text-purple-800' :
            'bg-yellow-100 text-yellow-800'
          }`}>
            {event.type}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleDelete(event.id, event.title)}
            disabled={deleteCareerEventMutation.isPending}
            className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
          >
            {deleteCareerEventMutation.isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Trash2 className="w-4 h-4" />
            )}
          </Button>
        </div>
        
        <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
          {event.title}
        </h3>
        
        <p className="text-neutral-600 dark:text-neutral-400 font-medium mb-3">
          {event.organization}
        </p>
        
        <p className="text-neutral-700 dark:text-neutral-300 mb-4">
          {event.description}
        </p>
        
        <div className="text-sm text-neutral-500 dark:text-neutral-400">
          <span>
            {new Date(event.startDate).toLocaleDateString('en-US', { 
              month: 'long', 
              year: 'numeric' 
            })} - {" "}
            {event.endDate 
              ? new Date(event.endDate).toLocaleDateString('en-US', { 
                  month: 'long', 
                  year: 'numeric' 
                })
              : "Present"
            }
          </span>
        </div>
      </div>
    ),
  })) ?? [];

  return (
    <div className="relative bg-neutral-50 dark:bg-neutral-950">
      <BackgroundBeams />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Professional Timeline</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Your career journey visualized.
          </p>
        </div>

        {timelineData.length > 0 ? (
          <Timeline data={timelineData} />
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              No Career Events Yet
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 mb-8">
              Add some career events to see your professional timeline come to life!
            </p>
            <Button asChild>
              <Link href="/career-events">Add Your First Career Event</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
