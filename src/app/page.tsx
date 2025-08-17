"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import SessionInfo from "./SessionInfo";
import { api } from "~/trpc/react";
import { LoadingScreen } from "~/components/ui/loading-screen";
import { CardSkeleton } from "~/components/ui/skeleton";
import { motion } from "motion/react";
import {
  Briefcase,
  BarChart3,
  DraftingCompass,
  UploadCloud,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { HeroParallax } from "~/components/ui/hero-parallax";

const products = [
  {
    title: "Moonbeam",
    link: "https://gomoonbeam.com/",
    thumbnail: "https://aceternity.com/images/products/thumbnails/new/moonbeam.png",
  },
  // ... (keep all your existing product entries)
];

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [showLoading, setShowLoading] = useState(true);
  const [contentReady, setContentReady] = useState(false);

  const { data: onboardingData, isLoading } = api.user.needsOnboarding.useQuery(
    undefined,
    { enabled: !!session }
  );

  useEffect(() => {
    if (session && onboardingData?.needsOnboarding) {
      router.push("/onboarding");
    }
  }, [session, onboardingData, router]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setContentReady(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleLoadingComplete = () => {
    setShowLoading(false);
  };

  if (status === "loading" || isLoading || !contentReady || showLoading) {
    return (
      <>
        <LoadingScreen
          isLoading={showLoading}
          onComplete={handleLoadingComplete}
        />
        {!showLoading && (
          <main className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="text-center mb-12">
                <div className="h-12 bg-gray-200 rounded-lg animate-pulse mb-4 w-64 mx-auto"></div>
                <div className="h-6 bg-gray-200 rounded-lg animate-pulse w-96 mx-auto"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <CardSkeleton key={i} />
                ))}
              </div>
            </div>
          </main>
        )}
      </>
    );
  }

  return (
    <main>
      <HeroParallax products={products} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SessionInfo />

        {session && (
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-12"
          >
            <Card className="pt-8">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl">Get Started</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {/* Career Events Card */}
                  <Link href="/career-events">
                    <Card className="h-full hover:border-primary transition-colors duration-300">
                      <CardHeader className="items-center text-center">
                        <div className="p-3 bg-primary/10 rounded-xl mb-2">
                          <Briefcase className="w-8 h-8 text-primary" />
                        </div>
                        <CardTitle>Career Events</CardTitle>
                      </CardHeader>
                      <CardContent className="text-center text-muted-foreground">
                        Add and manage your professional experiences, education,
                        and accomplishments.
                      </CardContent>
                    </Card>
                  </Link>

                  {/* Timeline Visualization Card */}
                  <Link href="/timeline">
                    <Card className="h-full hover:border-primary transition-colors duration-300">
                      <CardHeader className="items-center text-center">
                        <div className="p-3 bg-primary/10 rounded-xl mb-2">
                          <BarChart3 className="w-8 h-8 text-primary" />
                        </div>
                        <CardTitle>Timeline View</CardTitle>
                      </CardHeader>
                      <CardContent className="text-center text-muted-foreground">
                        Visualize your career journey with an interactive
                        timeline.
                      </CardContent>
                    </Card>
                  </Link>

                  {/* Pathfinder Card */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.4 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link href="/pathfinder" className="block">
                      <div className="bg-gradient-to-br from-teal-50 to-teal-100 border border-teal-200 rounded-xl p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group h-full">
                        <div className="flex items-center mb-4">
                          <div className="bg-teal-500 p-3 rounded-xl group-hover:bg-teal-600 transition-colors">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <h3 className="text-xl font-semibold text-gray-900 ml-3 group-hover:text-teal-700 transition-colors">Goal Pathfinder</h3>
                        </div>
                        <p className="text-gray-700">Find a proven first step for any professional or personal goal.</p>
                      </div>
                    </Link>
                  </motion.div>

                  {/* Portfolio Builder Card */}
                  <Card className="h-full relative overflow-hidden border-dashed">
                    <div className="absolute top-2 right-2 bg-secondary text-secondary-foreground text-xs font-medium px-2 py-1 rounded-full">
                      Coming Soon
                    </div>
                    <CardHeader className="items-center text-center opacity-50">
                      <div className="p-3 bg-secondary rounded-xl mb-2">
                        <DraftingCompass className="w-8 h-8 text-secondary-foreground" />
                      </div>
                      <CardTitle>Portfolio Builder</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center text-muted-foreground opacity-50">
                      Create beautiful, interactive portfolios from your career
                      timeline.
                    </CardContent>
                  </Card>

                  {/* File Upload Card */}
                  <Link href="/upload">
                    <Card className="h-full hover:border-primary transition-colors duration-300">
                      <CardHeader className="items-center text-center">
                        <div className="p-3 bg-primary/10 rounded-xl mb-2">
                          <UploadCloud className="w-8 h-8 text-primary" />
                        </div>
                        <CardTitle>File Upload</CardTitle>
                      </CardHeader>
                      <CardContent className="text-center text-muted-foreground">
                        Upload resumes and documents to automatically extract
                        career data.
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </main>
  );
}