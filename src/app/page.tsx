"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import SessionInfo from "./SessionInfo";
import { api } from "~/trpc/react";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const { data: onboardingData, isLoading } = api.user.needsOnboarding.useQuery(
    undefined,
    { enabled: !!session }
  );

  useEffect(() => {
    if (session && onboardingData?.needsOnboarding) {
      router.push("/onboarding");
    }
  }, [session, onboardingData, router]);

  if (status === "loading" || isLoading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="text-lg">Loading...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to SpectrumAI</h1>
          <p className="text-lg text-gray-600">Build your professional timeline and create stunning portfolios</p>
        </div>

        <SessionInfo />

        {session && (
          <div className="mt-12">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Get Started</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* Career Events Card */}
                <Link href="/career-events" className="block">
                  <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-center mb-4">
                      <div className="bg-blue-100 p-3 rounded-lg">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 ml-3">Career Events</h3>
                    </div>
                    <p className="text-gray-600">Add and manage your professional experiences, education, and accomplishments.</p>
                  </div>
                </Link>

                {/* Portfolio Builder Card (Coming Soon) */}
                <div className="border border-gray-200 rounded-lg p-6 opacity-50">
                  <div className="flex items-center mb-4">
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-400 ml-3">Portfolio Builder</h3>
                  </div>
                  <p className="text-gray-400">Create beautiful, interactive portfolios from your career timeline. (Coming Soon)</p>
                </div>

                {/* File Upload Card (Coming Soon) */}
                <div className="border border-gray-200 rounded-lg p-6 opacity-50">
                  <div className="flex items-center mb-4">
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-400 ml-3">File Upload</h3>
                  </div>
                  <p className="text-gray-400">Upload resumes and documents to automatically extract career data. (Coming Soon)</p>
                </div>

              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
