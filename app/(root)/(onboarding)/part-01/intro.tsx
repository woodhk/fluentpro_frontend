// Screen 1

import React from 'react';
import { useRouter } from 'expo-router';
import OnboardingTemplate from '@/components/templates/OnboardingTemplate';

const PartOneIntro = () => {
  const router = useRouter();
  
  return (
    <OnboardingTemplate
      title="Part One: Basic Information"
      subtitle="Let’s start with a few short questions to learn about you and your job position"
      illustration={require('@/assets/images/onboarding1.png')}
      primaryButtonText="Continue"
      onPrimaryPress={() => router.push('/(root)/(onboarding)/part-01/language')}
      showBackButton={true}
      progress={0.1}
    />
  );
};

export default PartOneIntro;