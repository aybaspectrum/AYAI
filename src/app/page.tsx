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
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { HeroParallax } from "~/components/ui/hero-parallax";

const products = [
  {
    title: "Portfolio",
    link: "https://spectrumv.space/",
    thumbnail:
      "https://image.thum.io/get/width/600/crop/400/https://spectrumv.space/",
  },
  {
    title: "LinkedIn",
    link: "https://www.linkedin.com/in/qaziwahid/",
    thumbnail:
      "https://image.thum.io/get/width/600/crop/400/https://www.linkedin.com/in/qaziwahid/",
  },
  {
    title: "GitHub",
    link: "https://github.com/kazwahid",
    thumbnail:
      "https://image.thum.io/get/width/600/crop/400/https://github.com/kazwahid",
  },
  {
    title: "Blog",
    link: "https://blog.spectrumv.space/",
    thumbnail:
      "https://image.thum.io/get/width/600/crop/400/https://blog.spectrumv.space/",
  },
  {
    title: "Editrix AI",
    link: "https://editrix.ai/",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/editrix.png",
  },
  {
    title: "Pixel Perfect",
    link: "https://app.pixelperfect.quest/",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/pixelperfect.png",
  },
  {
    title: "Algochurn",
    link: "https://algochurn.com/",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/algochurn.png",
  },
  {
    title: "Aceternity UI",
    link: "https://ui.aceternity.com/",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/aceternityui.png",
  },
  {
    title: "Tailwind Master Kit",
    link: "https://tailwindmasterkit.com/",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/tailwindmasterkit.png",
  },
  {
    title: "SmartBridge",
    link: "https://smartbridgetech.com/",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/smartbridge.png",
  },
  {
    title: "Renderwork Studio",
    link: "https://renderwork.studio/",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/renderwork.png",
  },
  {
    title: "Creme Digital",
    link: "https://cremedigital.com/",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/cremedigital.png",
  },
  {
    title: "Golden Bells Academy",
    link: "https://goldenbellsacademy.com/",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/goldenbellsacademy.png",
  },
  {
    title: "Invoker Labs",
    link: "https://invoker.lol/",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/invoker.png",
  },
  {
    title: "E Free Invoice",
    link: "https://efreeinvoice.com/",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/efreeinvoice.png",
  },
];

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [showLoading, setShowLoading] = useState(true);
  const [contentReady, setContentReady] = useState(false);

  const { data: onboardingData, isLoading } = api.user.needsOnboarding.useQuery(
    undefined,
    { enabled: !!session },
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
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
              <div className="mb-12 text-center">
                <div className="mx-auto mb-4 h-12 w-64 animate-pulse rounded-lg bg-gray-200"></div>
                <div className="mx-auto h-6 w-96 animate-pulse rounded-lg bg-gray-200"></div>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
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
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                  {/* Career Events Card */}
                  <Link href="/career-events">
                    <Card className="hover:border-primary h-full transition-colors duration-300">
                      <CardHeader className="items-center text-center">
                        <div className="bg-primary/10 mb-2 rounded-xl p-3">
                          <Briefcase className="text-primary h-8 w-8" />
                        </div>
                        <CardTitle>Career Events</CardTitle>
                      </CardHeader>
                      <CardContent className="text-muted-foreground text-center">
                        Add and manage your professional experiences, education,
                        and accomplishments.
                      </CardContent>
                    </Card>
                  </Link>

                  {/* Timeline Visualization Card */}
                  <Link href="/timeline">
                    <Card className="hover:border-primary h-full transition-colors duration-300">
                      <CardHeader className="items-center text-center">
                        <div className="bg-primary/10 mb-2 rounded-xl p-3">
                          <BarChart3 className="text-primary h-8 w-8" />
                        </div>
                        <CardTitle>Timeline View</CardTitle>
                      </CardHeader>
                      <CardContent className="text-muted-foreground text-center">
                        Visualize your career journey with an interactive
                        timeline.
                      </CardContent>
                    </Card>
                  </Link>

                  {/* Portfolio Builder Card (Coming Soon) */}
                  <Card className="relative h-full overflow-hidden border-dashed">
                    <div className="bg-secondary text-secondary-foreground absolute top-2 right-2 rounded-full px-2 py-1 text-xs font-medium">
                      Coming Soon
                    </div>
                    <CardHeader className="items-center text-center opacity-50">
                      <div className="bg-secondary mb-2 rounded-xl p-3">
                        <DraftingCompass className="text-secondary-foreground h-8 w-8" />
                      </div>
                      <CardTitle>Portfolio Builder</CardTitle>
                    </CardHeader>
                    <CardContent className="text-muted-foreground text-center opacity-50">
                      Create beautiful, interactive portfolios from your career
                      timeline.
                    </CardContent>
                  </Card>

                  {/* File Upload Card */}
                  <Link href="/upload">
                    <Card className="hover:border-primary h-full transition-colors duration-300">
                      <CardHeader className="items-center text-center">
                        <div className="bg-primary/10 mb-2 rounded-xl p-3">
                          <UploadCloud className="text-primary h-8 w-8" />
                        </div>
                        <CardTitle>File Upload</CardTitle>
                      </CardHeader>
                      <CardContent className="text-muted-foreground text-center">
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
