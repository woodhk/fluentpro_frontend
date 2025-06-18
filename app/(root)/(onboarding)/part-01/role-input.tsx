import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { updateJobTitle, updateJobDescription } from '@/lib/store/slices/onboarding/onboarding.slice';
import { searchRoles } from '@/lib/store/slices/onboarding/onboarding.thunks';
import { calculateOnboardingProgress, selectJobTitle, selectJobDescription, selectIsSearchingRoles, selectError } from '@/lib/store/slices/onboarding/onboarding.selectors';
import OnboardingSelectionTemplate from '@/components/onboarding/OnboardingSelectionTemplate';
import InputField from '@/components/InputField';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { icons } from '@/constants';
import ProgressBar from '@/components/ProgressBar';

const RoleInput = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const jobTitle = useAppSelector(selectJobTitle);
  const jobDescription = useAppSelector(selectJobDescription);
  const isSearchingRoles = useAppSelector(selectIsSearchingRoles);
  const error = useAppSelector(selectError);
  const progress = useAppSelector(calculateOnboardingProgress);
  
  // Local state for form validation
  const [titleError, setTitleError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');

  const validateForm = () => {
    let isValid = true;
    
    // Reset errors
    setTitleError('');
    setDescriptionError('');
    
    // Validate job title (2-200 chars as per API requirements)
    if (!jobTitle.trim()) {
      setTitleError('Job title is required');
      isValid = false;
    } else if (jobTitle.trim().length < 2) {
      setTitleError('Job title must be at least 2 characters');
      isValid = false;
    } else if (jobTitle.trim().length > 200) {
      setTitleError('Job title must be less than 200 characters');
      isValid = false;
    }
    
    // Validate job description (10-1000 chars as per API requirements)
    if (!jobDescription.trim()) {
      setDescriptionError('Job description is required');
      isValid = false;
    } else if (jobDescription.trim().length < 10) {
      setDescriptionError('Job description must be at least 10 characters');
      isValid = false;
    } else if (jobDescription.trim().length > 1000) {
      setDescriptionError('Job description must be less than 1000 characters');
      isValid = false;
    }
    
    return isValid;
  };

  const handleContinue = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      // Dispatch search roles action
      const result = await dispatch(searchRoles({
        job_title: jobTitle.trim(),
        job_description: jobDescription.trim()
      })).unwrap();

      // Navigate to role selection screen
      router.push('/(root)/(onboarding)/part-01/role-select');
    } catch (error) {
      // Error is handled by the Redux slice
      console.error('Failed to search roles:', error);
    }
  };

  const handleTitleChange = (text: string) => {
    dispatch(updateJobTitle(text));
    // Clear error when user starts typing
    if (titleError && text.trim().length >= 2) {
      setTitleError('');
    }
  };

  const handleDescriptionChange = (text: string) => {
    dispatch(updateJobDescription(text));
    // Clear error when user starts typing
    if (descriptionError && text.trim().length >= 10) {
      setDescriptionError('');
    }
  };

  // Show loading screen when searching for roles
  if (isSearchingRoles) {
    return (
      <LoadingSpinner 
        fullScreen 
        message="Searching for roles"
        size="large"
      />
    );
  }

  const isContinueDisabled = !jobTitle.trim() || !jobDescription.trim() || jobTitle.trim().length < 2 || jobDescription.trim().length < 10;

  return (
    <OnboardingSelectionTemplate
      title="What's Your Job Position?"
      description="Enter your job title and a short description of what you do. This helps us design speaking practice that fits your day-to-day communication needs."
      onContinue={handleContinue}
      continueButtonText="Search for my role"
      isContinueDisabled={isContinueDisabled}
      error={error}
      headerContent={<ProgressBar progress={progress} />}
    >
      <View className="space-y-4">
        {/* Job Title Input */}
        <InputField
          label="Title"
          value={jobTitle}
          onChangeText={handleTitleChange}
          placeholder="Enter your job title"
          icon={icons.person}
          maxLength={200}
        />
        {titleError ? (
          <View className="mt-1">
            <Text className="text-functional-error text-sm">{titleError}</Text>
          </View>
        ) : null}

        {/* Job Description Input */}
        <View className="mt-6">
          <InputField
            label="Description"
            value={jobDescription}
            onChangeText={handleDescriptionChange}
            placeholder="Enter a detailed job description"
            multiline
            numberOfLines={6}
            maxLength={1000}
            inputStyle="h-32 text-top"
            containerStyle="items-start rounded-lg"
          />
          {descriptionError ? (
            <View className="mt-1">
              <Text className="text-functional-error text-sm">{descriptionError}</Text>
            </View>
          ) : null}
          
          {/* Character count */}
          <View className="mt-2">
            <Text className="text-text-secondary text-xs text-right">
              {jobDescription.length}/1000 characters
            </Text>
          </View>
        </View>
      </View>
    </OnboardingSelectionTemplate>
  );
};

export default RoleInput;