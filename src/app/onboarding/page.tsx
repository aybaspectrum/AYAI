'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { api } from '~/trpc/react';
import { ConsentScreen } from '~/app/_components/onboarding/ConsentScreen';
import { LoadingScreen } from '~/components/ui/loading-screen';
import { useEffect } from 'react';

export default function OnboardingPage() {
  const router = useRouter();
  const { status } = useSession();

  const { data: onboardingData, isLoading } = api.user.needsOnboarding.useQuery(
    undefined,
    {
      enabled: status === 'authenticated',
    },
  );

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status, router]);

  useEffect(() => {
    if (onboardingData && !onboardingData.needsOnboarding) {
      router.push('/');
    }
  }, [onboardingData, router]);

  if (status === 'loading' || isLoading) {
    return <LoadingScreen isLoading={true} onComplete={() => { /* intentionally empty */ }} />;
  }

  if (onboardingData?.needsOnboarding) {
    return <ConsentScreen />;
  }

  // Fallback while redirecting
  return <LoadingScreen isLoading={true} onComplete={() => { /* intentionally empty */ }} />;
}