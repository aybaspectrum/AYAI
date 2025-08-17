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
  {
    title: "Cursor",
    link: "https://cursor.so/",
    thumbnail: "https://aceternity.com/images/products/thumbnails/new/cursor.png",
  },
  {
    title: "Rogue",
    link: "https://userogue.com/",
    thumbnail: "https://aceternity.com/images/products/thumbnails/new/rogue.png",
  },
  {
    title: "Editorially",
    link: "https://editorially.org/",
    thumbnail: "https://aceternity.com/images/products/thumbnails/new/editorially.png",
  },
  {
    title: "Editrix AI",
    link: "https://editrix.ai/",
    thumbnail: "https://aceternity.com/images/products/thumbnails/new/editrix.png",
  },
  {
    title: "Pixel Perfect",
    link: "https://app.pixelperfect.quest/",
    thumbnail: "https://aceternity.com/images/products/thumbnails/new/pixelperfect.png",
  },
  {
    title: "Algochurn",
    link: "https://algochurn.com/",
    thumbnail: "https://aceternity.com/images/products/thumbnails/new/algochurn.png",
  },
  {
    title: "Aceternity UI",
    link: "https://ui.aceternity.com/",
    thumbnail: "https://aceternity.com/images/products/thumbnails/new/aceternityui.png",
  },
  {
    title: "Tailwind Master Kit",
    link: "https://tailwindmasterkit.com/",
    thumbnail: "https://aceternity.com/images/products/thumbnails/new/tailwindmasterkit.png",
  },
  {
    title: "SmartBridge",
    link: "https://smartbridgetech.com/",
    thumbnail: "https://aceternity.com/images/products/thumbnails/new/smartbridge.png",
  },
  {
    title: "Renderwork Studio",
    link: "https://renderwork.studio/",
    thumbnail: "https://aceternity.com/images/products/thumbnails/new/renderwork.png",
  },
  {
    title: "Creme Digital",
    link: "https://cremedigital.com/",
    thumbnail: "https://aceternity.com/images/products/thumbnails/new/cremedigital.png",
  },
  {
    title: "Golden Bells Academy",
    link: "https://goldenbellsacademy.com/",
    thumbnail: "https://aceternity.com/images/products/thumbnails/new/goldenbellsacademy.png",
  },
  {
    title: "Invoker Labs",
    link: "https://invoker.lol/",
    thumbnail: "https://aceternity.com/images/products/thumbnails/new/invoker.png",
  },
  {
    title: "E Free Invoice",
    link: "https://efreeinvoice.com/",
    thumbnail: "https://aceternity.com/images/products/thumbnails/new/efreeinvoice.png",
  },
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
    // Simulate initial loading time
    const timer = setTimeout(() => {
      setContentReady(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleLoadingComplete = () => {
    setShowLoading(false);
  };

  // Show loading screen on initial load or when data is loading
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
      <HeroParallax
        products={products}
        title={
          <>
            Welcome to <br /> SpectrumAI
          </>
        }
        subtitle={
          <>
            Build your professional timeline and create stunning portfolios with
            the power of AI.
          </>
        }
      />
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

                  {/* Portfolio Builder Card (Coming Soon) */}
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
