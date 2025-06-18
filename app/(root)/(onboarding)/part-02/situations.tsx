// Screen 10 - Communication Situations Selection

import React, { useEffect, useMemo } from 'react';
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import OnboardingSelectionTemplate from '@/components/onboarding/OnboardingSelectionTemplate';
import SituationCheckbox from '@/components/SituationCheckbox';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { toggleSituationSelection, updateCurrentPartnerIndex, clearError } from '@/lib/store/slices/onboarding/onboarding.slice';
import { selectCommunicationSituations } from '@/lib/store/slices/onboarding/onboarding.thunks';
import { calculateOnboardingProgress, selectSelectedPartners, selectCurrentPartnerIndex, selectPartnerSituations, selectIsLoading, selectError } from '@/lib/store/slices/onboarding/onboarding.selectors';
import { communicationSituations, communicationPartners } from '@/constants';
import ProgressBar from '@/components/ProgressBar';

const Situations = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  
  const selectedPartners = useAppSelector(selectSelectedPartners);
  const currentPartnerIndex = useAppSelector(selectCurrentPartnerIndex);
  const partnerSituations = useAppSelector(selectPartnerSituations);
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);
  const progress = useAppSelector(calculateOnboardingProgress);

  // Get current partner info
  const currentPartnerId = selectedPartners[currentPartnerIndex];
  const currentPartner = communicationPartners.find(p => p.id === currentPartnerId);
  const currentSituations = partnerSituations[currentPartnerId] || [];
  const isLastPartner = currentPartnerIndex === selectedPartners.length - 1;

  useEffect(() => {
    // Clear any previous errors when component mounts
    dispatch(clearError());
  }, [dispatch]);

  // Redirect if no current partner
  useEffect(() => {
    if (!currentPartnerId) {
      router.replace('/(root)/(onboarding)/part-02/partners');
    }
  }, [currentPartnerId, router]);

  const handleSituationSelect = (situationId: string) => {
    dispatch(toggleSituationSelection({ 
      partnerId: currentPartnerId, 
      situationId 
    }));
  };

  const handleContinue = async () => {
    if (currentSituations.length === 0) {
      return;
    }

    try {
      // Submit situations for current partner
      await dispatch(selectCommunicationSituations({
        partner_id: currentPartnerId,
        situation_ids: currentSituations
      })).unwrap();
      
      if (isLastPartner) {
        // All partners done, go to next part
        router.push('/(root)/(onboarding)/part-02/complete');
      } else {
        // Move to next partner
        dispatch(updateCurrentPartnerIndex(currentPartnerIndex + 1));
      }
    } catch (error) {
      // Error is handled by Redux slice
      console.error('Failed to select communication situations:', error);
    }
  };

  // Dynamic title and description based on current partner
  const title = `Select Situations`;
  const description = currentPartner 
    ? `When do you speak English with ${currentPartner.name.toLowerCase()}?`
    : 'Select communication situations';

  const continueButtonText = isLastPartner ? 'Complete Part 2' : 'Continue';

  if (!currentPartner) {
    return null; // Will redirect in useEffect
  }

  return (
    <OnboardingSelectionTemplate
      title={title}
      description={description}
      onContinue={handleContinue}
      continueButtonText={continueButtonText}
      isContinueDisabled={currentSituations.length === 0 || isLoading}
      error={error}
      showBackButton={true}
      headerContent={<ProgressBar progress={progress} />}
    >
      <View className="flex-1">
        {/* Progress indicator */}
        <Text className="text-base font-JakartaMedium text-text-primary text-center mb-2">
          Partner {currentPartnerIndex + 1} of {selectedPartners.length}
        </Text>
        
        {/* Current partner info */}
        <View className="bg-primary-50 p-4 rounded-lg mb-6">
          <Text className="text-primary-600 text-sm font-JakartaMedium text-center">
            {currentPartner.name}
          </Text>
          <Text className="text-primary-600 text-xs font-Jakarta text-center mt-1">
            {currentPartner.description}
          </Text>
        </View>

        {/* Instruction text */}
        <Text className="text-base font-JakartaMedium text-text-primary text-center mb-6">
          Select all that apply
        </Text>

        {/* Situations grid */}
        <View className="flex-1">
          {communicationSituations.map((situation) => (
            <SituationCheckbox
              key={situation.id}
              id={situation.id}
              name={situation.name}
              icon={situation.icon}
              isSelected={currentSituations.includes(situation.id)}
              onSelect={handleSituationSelect}
            />
          ))}
        </View>

        {/* Selection feedback */}
        {currentSituations.length > 0 && (
          <View className="mt-4 p-3 bg-primary-50 rounded-lg">
            <Text className="text-primary-600 text-sm font-JakartaMedium text-center">
              {currentSituations.length} situation{currentSituations.length !== 1 ? 's' : ''} selected
            </Text>
          </View>
        )}
      </View>
    </OnboardingSelectionTemplate>
  );
};

export default Situations;