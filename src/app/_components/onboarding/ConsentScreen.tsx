"use client";

import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export function ConsentScreen() {
  const router = useRouter();
  const completeOnboarding = api.user.completeOnboarding.useMutation({
    onSuccess: () => {
      // Reload the page to reflect the new onboarding status
      router.refresh();
    },
  });

  const handleConsent = () => {
    // In a real scenario, you might pass some data here
    completeOnboarding.mutate();
  };

  const handleSkip = () => {
    completeOnboarding.mutate();
  };

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg">
        <Card>
          <CardHeader>
            <CardTitle>Connect Your Professional Accounts</CardTitle>
            <CardDescription>
              To help you build your career timeline, we can automatically gather
              data from your professional accounts like LinkedIn or GitHub.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              By granting consent, you allow SpectrumAI to access your public
              profile information, including your work experience, projects, and
              education history. We will never access your private data or post
              on your behalf.
            </p>
          </CardContent>
          <CardFooter className="flex justify-end gap-4">
            <Button variant="outline" onClick={handleSkip}>
              Skip for now
            </Button>
            <Button onClick={handleConsent}>Grant Consent</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
