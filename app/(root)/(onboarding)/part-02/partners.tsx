// Screen 9 - Communication Partners Selection

import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import OnboardingSelectionTemplate from '@/components/onboarding/OnboardingSelectionTemplate';
import CommunicationPartnerCheckbox from '@/components/CommunicationPartnerCheckbox';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { 
  selectCommunicationPartners,
  togglePartnerSelection,
  clearError,
  calculateOnboardingProgress
} from '@/lib/slices/onboardingSlice';
import { communicationPartners } from '@/constants';
import ProgressBar from '@/components/ProgressBar';

const Partners = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  
  const onboardingState = useAppSelector((state) => state.onboarding);
  const {
    selectedPartners,
    isLoading,
    error
  } = onboardingState;
  const progress = calculateOnboardingProgress(onboardingState);

  useEffect(() => {
    // Clear any previous errors when component mounts
    dispatch(clearError());
  }, [dispatch]);

  const handlePartnerSelect = (partnerId: string) => {
    dispatch(togglePartnerSelection(partnerId));
  };

  const handleContinue = async () => {
    if (selectedPartners.length === 0) {
      return;
    }

    try {
      await dispatch(selectCommunicationPartners({
        partner_ids: selectedPartners
      })).unwrap();
      
      // Navigate to next screen
      router.push('/(root)/(onboarding)/part-02/situations');
    } catch (error) {
      // Error is handled by Redux slice
      console.error('Failed to select communication partners:', error);
    }
  };

  return (
    <OnboardingSelectionTemplate
      title="Select Communication Partners"
      description="Who do you typically speak English with at work?"
      onContinue={handleContinue}
      continueButtonText="Continue"
      isContinueDisabled={selectedPartners.length === 0 || isLoading}
      error={error}
      showBackButton={true}
      headerContent={<ProgressBar progress={progress} />}
    >
      <View className="flex-1">
        {/* Instruction text */}
        <Text className="text-base font-JakartaMedium text-text-primary text-center mb-6">
          Select all that apply
        </Text>

        {/* Partners grid */}
        <View className="flex-1">
          {communicationPartners.map((partner) => (
            <CommunicationPartnerCheckbox
              key={partner.id}
              id={partner.id}
              name={partner.name}
              description={partner.description}
              icon={partner.icon}
              isSelected={selectedPartners.includes(partner.id)}
              onSelect={handlePartnerSelect}
            />
          ))}
        </View>

        {/* Selection feedback */}
        {selectedPartners.length > 0 && (
          <View className="mt-4 p-3 bg-primary-50 rounded-lg">
            <Text className="text-primary-600 text-sm font-JakartaMedium text-center">
              {selectedPartners.length} communication partner{selectedPartners.length !== 1 ? 's' : ''} selected
            </Text>
          </View>
        )}
      </View>
    </OnboardingSelectionTemplate>
  );
};

export default Partners;