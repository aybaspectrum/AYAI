"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "~/trpc/react";

export default function OnboardingPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const completeOnboardingMutation = api.user.completeOnboarding.useMutation();

  const handleGrantConsent = async () => {
    setIsLoading(true);
    try {
      // TODO: Implement account discovery logic
      // For now, just mark onboarding as completed
      await markOnboardingCompleted();
      router.push("/");
    } catch (error) {
      console.error("Error during account discovery:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = async () => {
    setIsLoading(true);
    try {
      await markOnboardingCompleted();
      router.push("/");
    } catch (error) {
      console.error("Error skipping onboarding:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const markOnboardingCompleted = async () => {
    await completeOnboardingMutation.mutateAsync();
  };

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

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome to SpectrumAI, {session.user?.name}!
          </h1>
          <p className="text-lg text-gray-600">
            Let&apos;s help you build your professional timeline
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Connect Your Professional Accounts
          </h2>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-blue-900 mb-2">
              What we&apos;ll access and why:
            </h3>
            <ul className="text-blue-800 space-y-2">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span><strong>LinkedIn:</strong> Your work history, education, and professional accomplishments</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span><strong>GitHub:</strong> Your repositories, contributions, and project timeline</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span><strong>Other platforms:</strong> Additional professional data you choose to connect</span>
              </li>
            </ul>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-green-900 mb-2">
              How this helps you:
            </h3>
            <ul className="text-green-800 space-y-2">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>Automatically populate your career timeline</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>Save time on manual data entry</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>Create comprehensive, accurate portfolios</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="text-sm text-gray-600">
              <strong>Privacy Note:</strong> We only access the data you explicitly consent to. 
              You can revoke access at any time in your account settings. All data is encrypted 
              and stored securely.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleGrantConsent}
            disabled={isLoading}
            className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? "Connecting..." : "Connect My Accounts"}
          </button>
          
          <button
            onClick={handleSkip}
            disabled={isLoading}
            className="px-8 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Skip for Now
          </button>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          You can always connect your accounts later from your profile settings.
        </p>
      </div>
    </div>
  );
}
