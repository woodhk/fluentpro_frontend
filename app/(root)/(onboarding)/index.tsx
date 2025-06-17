// Onboarding Entry/Redirect Logic

import { useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function OnboardingIndex() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the welcome screen when this index is loaded
    router.replace('/(root)/(onboarding)/welcome');
  }, [router]);

  return null;
}