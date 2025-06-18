// Screen 3

import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { updateNativeLanguage } from '@/lib/store/slices/onboarding/onboarding.slice';
import { setNativeLanguage, type NativeLanguage } from '@/lib/store/slices/onboarding/onboarding.thunks';
import { calculateOnboardingProgress, selectNativeLanguage, selectIsLoading, selectError } from '@/lib/store/slices/onboarding/onboarding.selectors';
import { nativeLanguages } from '@/constants';
import LanguageCheckbox from '@/components/organisms/SquareCheckbox';
import OnboardingSelectionTemplate from '@/components/templates/OnboardingSelectionTemplate';
import ProgressBar from '@/components/organisms/ProgressBar';

const NativeLanguageScreen = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const nativeLanguage = useAppSelector(selectNativeLanguage);
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);
  const progress = useAppSelector(calculateOnboardingProgress);
  
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(nativeLanguage);

  const handleLanguageSelect = (languageId: string) => {
    const language = nativeLanguages.find(lang => lang.id === languageId);
    if (language && language.available) {
      setSelectedLanguage(languageId);
      // Optimistically update local state
      dispatch(updateNativeLanguage(languageId as NativeLanguage));
    }
  };

  const handleContinue = async () => {
    if (!selectedLanguage) {
      Alert.alert('Selection Required', 'Please select your native language to continue.');
      return;
    }

    try {
      await dispatch(setNativeLanguage(selectedLanguage as NativeLanguage)).unwrap();
      // Navigate to next screen on success
      router.push('/(root)/(onboarding)/part-01/industry');
    } catch (error: any) {
      Alert.alert('Error', error || 'Failed to save language selection. Please try again.');
    }
  };

  return (
    <OnboardingSelectionTemplate
      title="What's Your Native Language?"
      description="This will help our tutors explain concepts to you in your mother tongue"
      onContinue={handleContinue}
      isContinueDisabled={!selectedLanguage || isLoading}
      error={error}
      headerContent={<ProgressBar progress={progress} />}
    >
      <View className="flex-row flex-wrap justify-between">
        {nativeLanguages.map((language) => (
          <View key={language.id} style={{ width: '48%', marginBottom: 16 }}>
            <LanguageCheckbox
              id={language.id}
              name={language.name}
              emoji={language.emoji}
              isSelected={selectedLanguage === language.id}
              available={language.available}
              onSelect={handleLanguageSelect}
            />
          </View>
        ))}
      </View>
    </OnboardingSelectionTemplate>
  );
};

export default NativeLanguageScreen;