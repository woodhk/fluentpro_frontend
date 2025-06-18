import OnboardingSelectionTemplate from '@/components/onboarding/OnboardingSelectionTemplate';
import ProgressBar from '@/components/ProgressBar';
import SelectableOption from '@/components/RectangleCheckbox';
import { industries } from '@/constants';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { calculateOnboardingProgress, selectError, selectIndustry, selectIsLoading } from '@/lib/store/slices/onboarding/onboarding.selectors';
import { updateIndustry } from '@/lib/store/slices/onboarding/onboarding.slice';
import { setIndustry, type Industry } from '@/lib/store/slices/onboarding/onboarding.thunks';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, View } from 'react-native';

const IndustryScreen = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const industry = useAppSelector(selectIndustry);
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);
  const progress = useAppSelector(calculateOnboardingProgress);
  
  const [selectedIndustry, setSelectedIndustry] = useState<Industry | null>(industry);

  const handleIndustrySelect = (industryId: string) => {
    const selected = industryId as Industry;
    setSelectedIndustry(selected);
    // Update local state optimistically
    dispatch(updateIndustry(selected));
  };

  const handleContinue = async () => {
    if (!selectedIndustry) {
      Alert.alert('Selection Required', 'Please select an industry to continue.');
      return;
    }

    try {
      await dispatch(setIndustry(selectedIndustry)).unwrap();
      // Navigate to next screen on success
      router.push('/(root)/(onboarding)/part-01/role-input');
    } catch (error: any) {
      Alert.alert('Error', error || 'Failed to save industry selection. Please try again.');
    }
  };

  return (
    <OnboardingSelectionTemplate
      title="What's your industry?"
      description="We'll personalize your learning experience based on your professional field."
      onContinue={handleContinue}
      isContinueDisabled={!selectedIndustry || isLoading}
      error={error}
      headerContent={<ProgressBar progress={progress} />}
    >
      <View>
        {industries.map((industryOption, index) => (
          <View key={industryOption.id} className={index < industries.length - 1 ? "mb-4" : ""}>
            <SelectableOption
              id={industryOption.id}
              name={industryOption.name}
              icon={industryOption.icon}
              isSelected={selectedIndustry === industryOption.id}
              available={industryOption.available}
              onSelect={handleIndustrySelect}
              variant="simple"
            />
          </View>
        ))}
      </View>
    </OnboardingSelectionTemplate>
  );
};

export default IndustryScreen;