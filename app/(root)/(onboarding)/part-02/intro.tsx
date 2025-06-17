// Screen 8

import React from 'react';
import { useRouter } from 'expo-router';
import { useAppSelector } from '@/lib/hooks';
import OnboardingTemplate from '@/components/onboarding/OnboardingTemplate';
import { images, data } from '@/constants';

const PartTwoIntro = () => {
  const router = useRouter();
  
  // Get onboarding data from Redux store
  const { industry, selectedRole, customRole } = useAppSelector(
    (state) => state.onboarding
  );

  // Function to get industry display data
  const getIndustryData = () => {
    if (!industry) return 'industry';
    const industryOption = data.industries.find(ind => ind.id === industry);
    return industryOption?.name || 'industry';
  };

  // Function to get role display data
  const getRoleData = () => {
    if (selectedRole) {
      return selectedRole.title;
    }
    if (customRole) {
      return customRole.title;
    }
    return 'role';
  };

  const handleContinue = () => {
    router.push('/(root)/(onboarding)/part-02/situations');
  };

  return (
    <OnboardingTemplate
      title="Part 2: Personalisation"
      subtitle={`Let's now personalise your learning curriculum for a ${getIndustryData()} ${getRoleData()}`}
      illustration={images.onboarding2}
      primaryButtonText="Continue"
      onPrimaryPress={handleContinue}
      showBackButton={true}
      progress={0.66}
    />
  );
};

export default PartTwoIntro