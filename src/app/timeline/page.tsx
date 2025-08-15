"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { api } from "~/trpc/react";
import { Timeline } from "~/components/ui/timeline";
import { TextGenerateEffect } from "~/components/ui/text-generate-effect";
import { BackgroundBeams } from "~/components/ui/background-beams";
import { CareerEventType } from "@prisma/client";

export default function TimelinePage() {
  const { data: session } = useSession();
  const { data: careerEvents } = api.careerEvent.getAll.useQuery();

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

  // Transform career events into timeline data
  const timelineData = careerEvents?.map((event) => ({
    title: new Date(event.startDate).getFullYear().toString(),
    content: (
      <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700">
        <div className="flex items-center gap-2 mb-3">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            event.type === CareerEventType.JOB ? 'bg-blue-100 text-blue-800' :
            event.type === CareerEventType.PROJECT ? 'bg-green-100 text-green-800' :
            event.type === CareerEventType.EDUCATION ? 'bg-purple-100 text-purple-800' :
            'bg-yellow-100 text-yellow-800'
          }`}>
            {event.type}
          </span>
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
  })) || [];

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 relative">
      <BackgroundBeams />
      
      {/* Header */}
      <div className="bg-white dark:bg-neutral-900 shadow relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <TextGenerateEffect 
                words="Professional Timeline" 
                className="text-3xl font-bold text-gray-900 dark:text-white"
              />
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Your career journey visualized
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/career-events" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                ← Back to Career Events
              </Link>
              <span className="text-gray-600 dark:text-gray-400">|</span>
              <span className="text-gray-600 dark:text-gray-400">Welcome, {session.user?.name}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Content */}
      <div className="relative z-10">
        {timelineData.length > 0 ? (
          <Timeline data={timelineData} />
        ) : (
          <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                No Career Events Yet
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 mb-8">
                Add some career events to see your professional timeline come to life!
              </p>
              <Link 
                href="/career-events"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Add Your First Career Event
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
