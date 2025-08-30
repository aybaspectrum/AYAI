"use client";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { RequireLoginCard } from "~/components/ui/RequireLoginCard";
import { api } from "~/trpc/react";
import { BackgroundBeams } from "~/components/ui/background-beams";
import { Button } from "~/components/ui/button";
import { Plus } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";

const Timeline3D = dynamic(
  () => import("~/components/ui/timeline-3d").then((mod) => mod.Timeline3D),
  {
    loading: () => <Skeleton className="h-[500px] w-full" />,
    ssr: false,
  },
);

export default function TimelinePage() {
  const { data: session } = useSession();
  const {
    data: careerEvents,
    isLoading,
    error,
  } = api.careerEvent.getAll.useQuery(undefined, {
    enabled: !!session,
  });

  if (!session) {
    return <RequireLoginCard message="You need to be logged in to view your timeline." />;
  }

  return (
    <div className="relative min-h-screen">
      <BackgroundBeams />
      <div className="relative z-10 container mx-auto flex flex-col items-center justify-center py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold">3D Professional Timeline</h1>
          <p className="text-muted-foreground mt-2">
            An interactive visualization of your career journey.
          </p>
        </div>

        {isLoading ? (
          <Skeleton className="h-[500px] w-full" />
        ) : error ? (
          <Card className="mx-auto max-w-2xl text-center">
            <CardHeader>
              <CardTitle>Error Loading Timeline</CardTitle>
              <CardDescription>
                {error.message || "An error occurred while fetching your timeline."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => window.location.reload()}>Retry</Button>
            </CardContent>
          </Card>
        ) : careerEvents && careerEvents.length > 0 ? (
          <Timeline3D events={careerEvents} />
        ) : (
          <Card className="mx-auto max-w-2xl text-center">
            <CardHeader>
              <CardTitle>Your Timeline is Empty</CardTitle>
              <CardDescription>
                Add some career events to see your professional timeline come to
                life!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/career-events">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
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
