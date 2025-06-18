// Screen 11

import React from 'react';
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppSelector } from '@/lib/store/hooks';
import { calculateOnboardingProgress, selectSelectedPartners, selectPartnerSituations } from '@/lib/store/slices/onboarding/onboarding.selectors';
import OnboardingSelectionTemplate from '@/components/templates/OnboardingSelectionTemplate';
import SummaryItem from '@/components/molecules/SummaryItem';
import { data } from '@/constants';
import ProgressBar from '@/components/organisms/ProgressBar';

const PartTwoComplete = () => {
  const router = useRouter();
  
  // Get onboarding data from Redux store
  const selectedPartners = useAppSelector(selectSelectedPartners);
  const partnerSituations = useAppSelector(selectPartnerSituations);
  const progress = useAppSelector(calculateOnboardingProgress);

  // Function to get summary items for each selected partner with their situations
  const getSummaryItems = () => {
    if (!selectedPartners || selectedPartners.length === 0) return [];
    
    const items = selectedPartners.map(partnerId => {
      const partner = data.communicationPartners.find(p => p.id === partnerId);
      const situations = partnerSituations[partnerId] || [];
      
      if (!partner) return null;
      
      // Get the actual situation names for this partner
      const situationNames = situations.map(situationId => {
        const situation = data.communicationSituations.find(s => s.id === situationId);
        return situation?.name;
      }).filter(Boolean);
      
      const description = situationNames.length > 0 
        ? situationNames.join(', ') 
        : '(no situations selected)';
      
      return {
        title: partner.name,
        description: description,
        icon: partner.icon,
        bgColor: '#6366F1', // Use consistent color for all partner sections
      };
    }).filter((item): item is NonNullable<typeof item> => item !== null);
    
    return items;
  };

  const handleContinue = () => {
    // Navigate to part 3 of onboarding
    router.push('/(root)/(onboarding)/part-03/summary');
  };

  return (
    <OnboardingSelectionTemplate
      title="Part Two Complete ✅"
      description="Great, we'll make sure topics cover the following conversations:"
      onContinue={handleContinue}
      continueButtonText="Continue"
      showBackButton={true}
      headerContent={<ProgressBar progress={progress} />}
    >
      <View className="flex-1">
        {/* Summary container - single box with dividers */}
        <View className="bg-white rounded-2xl shadow-sm border border-gray-100">
          {getSummaryItems().map((item, index) => (
            <SummaryItem
              key={`${item.title}-${index}`}
              title={item.title}
              description={item.description}
              icon={item.icon}
              bgColor={item.bgColor}
              isLast={index === getSummaryItems().length - 1}
            />
          ))}
        </View>
      </View>
    </OnboardingSelectionTemplate>
  );
};

export default PartTwoComplete;