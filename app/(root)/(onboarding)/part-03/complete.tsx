// Screen 13-19 - Part 3 completion screens

import React, { useState, useEffect } from 'react';
import { View, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import OnboardingTemplate from '@/components/onboarding/OnboardingTemplate';
import { data } from '@/constants';
import { apiClient } from '@/lib/api';

const PartThreeComplete = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [currentScreen, setCurrentScreen] = useState(0);
  const [isCompleting, setIsCompleting] = useState(false);
  
  // Get onboarding data from Redux store
  const { industry, selectedRole, customRole } = useAppSelector((state) => state.onboarding);
  
  const screens = data.part3CompletionScreens;
  const currentScreenData = screens[currentScreen];
  
  // Function to get role display data
  const getRoleData = () => {
    if (selectedRole) {
      return selectedRole.title;
    }
    if (customRole) {
      return customRole.title;
    }
    return 'your role';
  };

  // Function to get industry display data
  const getIndustryData = () => {
    if (!industry) return 'your industry';
    const industryOption = data.industries.find(ind => ind.id === industry);
    return industryOption?.name || 'your industry';
  };

  // Replace placeholders in description text
  const getProcessedDescription = (description: string) => {
    return description
      .replace('{role}', getRoleData())
      .replace('{industry}', getIndustryData());
  };

  const handleContinue = async () => {
    if (currentScreen < screens.length - 1) {
      // Navigate to next screen
      setCurrentScreen(currentScreen + 1);
    } else {
      // Last screen - complete onboarding and enter app
      await handleCompleteOnboarding();
    }
  };

  const handleCompleteOnboarding = async () => {
    try {
      setIsCompleting(true);
      
      // Call API to complete onboarding
      const response = await apiClient.completeOnboarding();
      
      if (response.success) {
        // Navigate to main app (tabs)
        router.replace('/(root)/(tabs)/home');
      } else {
        Alert.alert('Error', response.message || 'Failed to complete onboarding');
      }
    } catch (error: any) {
      console.error('Error completing onboarding:', error);
      Alert.alert(
        'Error', 
        error?.message || 'An error occurred while completing onboarding. Please try again.'
      );
    } finally {
      setIsCompleting(false);
    }
  };

  const handleBack = () => {
    if (currentScreen > 0) {
      setCurrentScreen(currentScreen - 1);
    } else {
      router.back();
    }
  };

  return (
    <OnboardingTemplate
      title={currentScreenData.title}
      subtitle={getProcessedDescription(currentScreenData.description)}
      illustration={currentScreenData.image}
      primaryButtonText={
        currentScreenData.buttonText || 
        (isCompleting ? 'Completing...' : 'Continue')
      }
      onPrimaryPress={handleContinue}
      showBackButton={false}
    />
  );
};

export default PartThreeComplete;