import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { updateSelectedRole, updateCustomRole, selectRole } from '@/lib/slices/onboardingSlice';
import OnboardingSelectionTemplate from '@/components/onboarding/OnboardingSelectionTemplate';
import RoleSelectionBox from '@/components/RoleSelectionBox';
import { RoleMatch, RoleSelectionRequest } from '@/lib/types';

const RoleSelection = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { 
    roleMatches, 
    selectedRole, 
    customRole, 
    jobTitle, 
    jobDescription, 
    isLoading, 
    error 
  } = useAppSelector(state => state.onboarding);

  const [showCustomRole, setShowCustomRole] = useState(false);

  // Check if we have role matches, if not, redirect back
  useEffect(() => {
    if (roleMatches.length === 0) {
      router.back();
    }
  }, [roleMatches, router]);

  const handleRoleSelect = (role: RoleMatch) => {
    dispatch(updateSelectedRole(role));
    setShowCustomRole(false);
  };

  const handleCustomRoleSelect = () => {
    // Set custom role from the original job input
    dispatch(updateCustomRole({
      title: jobTitle,
      description: jobDescription
    }));
    setShowCustomRole(true);
  };

  const handleContinue = async () => {
    try {
      let selectionData: RoleSelectionRequest;

      if (selectedRole) {
        // User selected a predefined role
        selectionData = {
          role_id: selectedRole.id
        };
      } else if (customRole) {
        // User chose "none of these are my role" 
        selectionData = {
          custom_title: customRole.title,
          custom_description: customRole.description
        };
      } else {
        // Should not happen, but handle gracefully
        return;
      }

      await dispatch(selectRole(selectionData)).unwrap();
      
      // Navigate to next onboarding step
      router.push('/(root)/(onboarding)/part-01/complete');
    } catch (error) {
      // Error is handled by the Redux slice
      console.error('Failed to select role:', error);
    }
  };

  const isContinueDisabled = !selectedRole && !customRole;

  return (
    <OnboardingSelectionTemplate
      title="Select Your Job Position"
      description="We found roles that match your description. Select the role that best describes your situation"
      onContinue={handleContinue}
      continueButtonText="Continue"
      isContinueDisabled={isContinueDisabled || isLoading}
      error={error}
      progress={0.5}
    >
      <View className="space-y-3">
        {/* Role matches */}
        {roleMatches.map((role) => (
          <RoleSelectionBox
            key={role.id}
            role={role}
            isSelected={selectedRole?.id === role.id}
            onSelect={handleRoleSelect}
          />
        ))}

        {/* Custom role option */}
        <TouchableOpacity
          onPress={handleCustomRoleSelect}
          className={`
            flex-row items-center p-4 rounded-xl border-2
            ${showCustomRole && customRole
              ? 'border-primary-600 bg-primary-50' 
              : 'border-neutral-200 bg-white'
            }
          `}
        >
          {/* Radio button */}
          <View className={`
            w-5 h-5 rounded-full border-2 mr-3 items-center justify-center
            ${showCustomRole && customRole 
              ? 'border-primary-600 bg-primary-600' 
              : 'border-neutral-300'
            }
          `}>
            {showCustomRole && customRole && (
              <View className="w-2 h-2 rounded-full bg-white" />
            )}
          </View>
          
          <Text className={`
            flex-1 text-base font-JakartaMedium
            ${showCustomRole && customRole ? 'text-primary-600' : 'text-text-primary'}
          `}>
            None of these are my role
          </Text>
        </TouchableOpacity>

        {/* Show custom role details when selected */}
        {showCustomRole && customRole && (
          <View className="mt-4 p-4 bg-neutral-50 rounded-xl">
            <Text className="text-sm font-JakartaSemiBold text-text-primary mb-2">
              Your Custom Role:
            </Text>
            <Text className="text-base font-JakartaMedium text-text-primary mb-1">
              {customRole.title}
            </Text>
            <Text className="text-sm text-text-secondary">
              {customRole.description}
            </Text>
          </View>
        )}

        {/* Help text */}
        <View className="mt-6 p-4 bg-accent-50 rounded-xl">
          <Text className="text-sm text-accent-600 text-center">
            💡 Don't worry! You can always change your role selection later in your profile settings.
          </Text>
        </View>
      </View>
    </OnboardingSelectionTemplate>
  );
};

export default RoleSelection;