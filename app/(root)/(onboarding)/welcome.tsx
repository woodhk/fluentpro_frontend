// Screen 1

import React from 'react';
import { useRouter } from 'expo-router';
import OnboardingTemplate from '@/components/onboarding/OnboardingTemplate';

const Welcome = () => {
  const router = useRouter();
  
  return (
    <OnboardingTemplate
      title="Welcome 👋"
      subtitle="We're excited to have you here. Let's get started with a quick setup"
      illustration={require('@/assets/images/onboarding1.png')}
      primaryButtonText="Continue"
      onPrimaryPress={() => router.push('/(root)/(onboarding)/part-01/intro')}
      showBackButton={false}
      progress={0.1}
    />
  );
};

export default Welcome;