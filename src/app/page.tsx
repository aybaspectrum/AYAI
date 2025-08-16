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
                {[...Array(6)].map((_, i) => (
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
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Welcome to SpectrumAI
          </h1>
          <p className="text-xl text-gray-600">Build your professional timeline and create stunning portfolios</p>
        </motion.div>

        <SessionInfo />

        {session && (
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-12"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
              <h2 className="text-3xl font-semibold text-gray-900 mb-8 text-center">Get Started</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                {/* Career Events Card */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link href="/career-events" className="block">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group">
                      <div className="flex items-center mb-4">
                        <div className="bg-blue-500 p-3 rounded-xl group-hover:bg-blue-600 transition-colors">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 ml-3 group-hover:text-blue-700 transition-colors">Career Events</h3>
                      </div>
                      <p className="text-gray-700">Add and manage your professional experiences, education, and accomplishments.</p>
                    </div>
                  </Link>
                </motion.div>

                {/* Timeline Visualization Card */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.4 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link href="/timeline" className="block">
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group">
                      <div className="flex items-center mb-4">
                        <div className="bg-purple-500 p-3 rounded-xl group-hover:bg-purple-600 transition-colors">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 ml-3 group-hover:text-purple-700 transition-colors">Timeline View</h3>
                      </div>
                      <p className="text-gray-700">Visualize your career journey with an interactive timeline.</p>
                    </div>
                  </Link>
                </motion.div>

                {/* Portfolio Builder Card (Coming Soon) */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.4 }}
                  className="relative"
                >
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-xl p-6 relative overflow-hidden">
                    <div className="absolute top-2 right-2 bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full">
                      Coming Soon
                    </div>
                    <div className="flex items-center mb-4">
                      <div className="bg-gray-300 p-3 rounded-xl">
                        <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-600 ml-3">Portfolio Builder</h3>
                    </div>
                    <p className="text-gray-600">Create beautiful, interactive portfolios from your career timeline.</p>
                  </div>
                </motion.div>

                {/* File Upload Card */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.9, duration: 0.4 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link href="/upload" className="block">
                    <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group">
                      <div className="flex items-center mb-4">
                        <div className="bg-green-500 p-3 rounded-xl group-hover:bg-green-600 transition-colors">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 ml-3 group-hover:text-green-700 transition-colors">File Upload</h3>
                      </div>
                      <p className="text-gray-700">Upload resumes and documents to automatically extract career data.</p>
                    </div>
                  </Link>
                </motion.div>

              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.main>
  );
}
