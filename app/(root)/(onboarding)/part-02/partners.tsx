// Screen 9 - Communication Partners Selection

import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import OnboardingSelectionTemplate from '@/components/onboarding/OnboardingSelectionTemplate';
import CommunicationPartnerCheckbox from '@/components/CommunicationPartnerCheckbox';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { 
  fetchCommunicationPartners, 
  selectCommunicationPartners, 
  togglePartnerSelection,
  clearError 
} from '@/lib/slices/onboardingSlice';
import { communicationPartners } from '@/constants';

const Partners = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  
  const {
    availablePartners,
    selectedPartners,
    isLoadingPartners,
    isLoading,
    error
  } = useAppSelector((state) => state.onboarding);

  useEffect(() => {
    // Clear any previous errors when component mounts
    dispatch(clearError());
    
    // Fetch available communication partners from API
    dispatch(fetchCommunicationPartners());
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

  // Map API partners with local icon data
  const partnersToShow = availablePartners.length > 0 
    ? availablePartners.map(apiPartner => {
        // Find matching local data by name (case-insensitive)
        const localPartner = communicationPartners.find(local => 
          local.name.toLowerCase() === apiPartner.name.toLowerCase()
        );
        return {
          ...apiPartner, // Use API data including the UUID
          icon: localPartner?.icon || {
            library: 'ionicons' as const,
            name: 'people-outline' as const,
          }
        };
      })
    : communicationPartners;

  if (isLoadingPartners) {
    return (
      <OnboardingSelectionTemplate
        title="Select Communication Partners"
        description="Who do you typically speak English with at work?"
        onContinue={() => {}}
        isContinueDisabled={true}
      >
        <View className="flex-1 justify-center items-center">
          <LoadingSpinner />
          <Text className="text-text-secondary mt-4">Loading communication partners...</Text>
        </View>
      </OnboardingSelectionTemplate>
    );
  }

  return (
    <OnboardingSelectionTemplate
      title="Select Communication Partners"
      description="Who do you typically speak English with at work?"
      onContinue={handleContinue}
      continueButtonText="Continue"
      isContinueDisabled={selectedPartners.length === 0 || isLoading}
      error={error}
      showBackButton={true}
    >
      <View className="flex-1">
        {/* Instruction text */}
        <Text className="text-base font-JakartaMedium text-text-primary text-center mb-6">
          Select all that apply
        </Text>

        {/* Partners grid */}
        <View className="flex-1">
          {partnersToShow.map((partner) => (
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