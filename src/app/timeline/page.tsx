"use client";
import dynamic from 'next/dynamic';
import { useSession } from "next-auth/react";
import Link from "next/link";
import { api } from "~/trpc/react";
import { BackgroundBeams } from "~/components/ui/background-beams";
import { Button } from "~/components/ui/button";
import { Plus } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";

const Timeline3D = dynamic(() => import('~/components/ui/timeline-3d').then(mod => mod.Timeline3D), {
  loading: () => <Skeleton className="h-[500px] w-full" />,
  ssr: false
});

export default function TimelinePage() {
  const { data: session } = useSession();
  const { data: careerEvents } = api.careerEvent.getAll.useQuery(undefined, {
    enabled: !!session,
  });

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

  return (
    <div className="relative min-h-screen">
      <BackgroundBeams />
      <div className="container relative z-10 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold">3D Professional Timeline</h1>
          <p className="text-muted-foreground mt-2">An interactive visualization of your career journey.</p>
        </div>

        {careerEvents && careerEvents.length > 0 ? (
          <Timeline3D events={careerEvents} />
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