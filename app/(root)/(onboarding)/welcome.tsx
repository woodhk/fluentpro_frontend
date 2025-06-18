// Screen 1

import React from 'react';
import { useRouter } from 'expo-router';
import OnboardingTemplate from '@/components/onboarding/OnboardingTemplate';

const Welcome = () => {
  const router = useRouter();
  
  return (
    <OnboardingTemplate
      title="Welcome 👋"
      subtitle="Let's get started with a quick setup."
      secondParagraph="This will help us to build the best study plan for you!"
      illustration={require('@/assets/images/onboarding1.png')}
      primaryButtonText="Continue"
      onPrimaryPress={() => router.push('/(root)/(onboarding)/part-01/intro')}
      showBackButton={false}
      progress={0.1}
    />
  );
};

export default Welcome;