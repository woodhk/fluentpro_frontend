// Screen 7

import React from 'react';
import { View, Text, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppSelector } from '@/lib/hooks';
import { calculateOnboardingProgress } from '@/lib/slices/onboardingSlice';
import OnboardingSelectionTemplate from '@/components/onboarding/OnboardingSelectionTemplate';
import SummaryItem from '@/components/SummaryItem';
import { data } from '@/constants';
import ProgressBar from '@/components/ProgressBar';

const PartOneComplete = () => {
  const router = useRouter();
  
  // Get onboarding data from Redux store
  const onboardingState = useAppSelector((state) => state.onboarding);
  const { nativeLanguage, industry, selectedRole, customRole } = onboardingState;
  const progress = calculateOnboardingProgress(onboardingState);

  // Function to get language display data
  const getLanguageData = () => {
    if (!nativeLanguage) return null;
    const languageOption = data.nativeLanguages.find(lang => lang.id === nativeLanguage);
    return languageOption ? `AI Tutors explain concepts in ${languageOption.name}` : null;
  };

  // Function to get industry display data
  const getIndustryData = () => {
    if (!industry) return null;
    const industryOption = data.industries.find(ind => ind.id === industry);
    return industryOption?.name || null;
  };

  // Function to get role display data
  const getRoleData = () => {
    if (selectedRole) {
      return selectedRole.title;
    }
    if (customRole) {
      return customRole.title;
    }
    return null;
  };

  const handleContinue = () => {
    // Navigate to part 2 of onboarding
    router.push('/(root)/(onboarding)/part-02/intro');
  };

  return (
    <OnboardingSelectionTemplate
      title="Part One Complete ✅"
      description="Great, we'll make sure content is tailored for:"
      onContinue={handleContinue}
      continueButtonText="Continue"
      showBackButton={true}
      headerContent={<ProgressBar progress={progress} />}
    >
      <View className="flex-1">
        {/* Summary container - single box with dividers */}
        <View className="bg-white rounded-2xl shadow-sm border border-gray-100">
          {/* Native Language Summary */}
          {getLanguageData() && (
            <SummaryItem
              title={data.summaryData.nativeLanguage.title}
              description={getLanguageData()!}
              icon={data.summaryData.nativeLanguage.icon}
              bgColor={data.summaryData.nativeLanguage.bgColor}
              isLast={!getIndustryData() && !getRoleData()}
            />
          )}

          {/* Industry Summary */}
          {getIndustryData() && (
            <SummaryItem
              title={data.summaryData.industry.title}
              description={getIndustryData()!}
              icon={data.summaryData.industry.icon}
              bgColor={data.summaryData.industry.bgColor}
              isLast={!getRoleData()}
            />
          )}

          {/* Role Summary */}
          {getRoleData() && (
            <SummaryItem
              title={data.summaryData.role.title}
              description={getRoleData()!}
              icon={data.summaryData.role.icon}
              bgColor={data.summaryData.role.bgColor}
              isLast={true}
            />
          )}
        </View>
      </View>
    </OnboardingSelectionTemplate>
  );
};

export default PartOneComplete;