'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { api } from '~/trpc/react';
import { ConsentScreen } from '~/app/_components/onboarding/ConsentScreen';
import { LoadingScreen } from '~/components/ui/loading-screen';

export default function OnboardingPage() {
  const router = useRouter();
  const { status } = useSession();

  const { data: onboardingData, isLoading } = api.user.needsOnboarding.useQuery(
    undefined,
    {
      enabled: status === 'authenticated',
      // If onboarding is already complete, redirect away
      onSuccess: (data) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (data && !data.needsOnboarding) {
          router.push('/');
        }
      },
    },
  );

  if (status === 'loading' || isLoading) {
    return <LoadingScreen isLoading={true} onComplete={() => { /* intentionally empty */ }} />;
  }

  if (status === 'unauthenticated') {
    router.push('/');
    return <LoadingScreen isLoading={true} onComplete={() => { /* intentionally empty */ }} />;
  }

  if (onboardingData?.needsOnboarding) {
    return <ConsentScreen />;
  }

  // Fallback while redirecting
  return <LoadingScreen isLoading={true} onComplete={() => { /* intentionally empty */ }} />;
}