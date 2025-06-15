// app/(root)/onboarding.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LoadingButton } from '../../components/auth/LoadingButton';
import { authService } from '../../lib/auth';

export default function OnboardingScreen() {
  const router = useRouter();

  const handleCompleteOnboarding = async () => {
    try {
      // Mark onboarding as completed
      await authService.completeOnboarding();
      
      // Navigate to home screen
      router.replace('/(root)/(tabs)/home');
    } catch (error) {
      console.error('Failed to complete onboarding:', error);
      // Still navigate to home - don't block user
      router.replace('/(root)/(tabs)/home');
    }
  };

  const handleSignOut = async () => {
    try {
      await authService.signOut();
      router.replace('/(auth)/sign-in');
    } catch (error) {
      console.error('Sign out error:', error);
      // Force navigation even if sign out fails
      router.replace('/(auth)/sign-in');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-center items-center px-6">
        {/* Placeholder Content */}
        <View className="items-center mb-12">
          <Text className="text-4xl font-bold text-primary-600 mb-4">
            🎉
          </Text>
          <Text className="text-2xl font-bold text-text-primary mb-4 text-center">
            Welcome to FluentPro!
          </Text>
          <Text className="text-lg text-text-secondary text-center leading-6">
            You've successfully created your account. The onboarding flow will be implemented here in the future.
          </Text>
        </View>

        {/* Temporary Message */}
        <View className="bg-light-100 p-6 rounded-lg mb-8">
          <Text className="text-text-primary font-medium mb-2">
            📝 Development Note:
          </Text>
          <Text className="text-text-secondary text-sm leading-5">
            This is a placeholder onboarding screen. The full onboarding experience with language selection, industry choice, and role matching will be implemented here.
          </Text>
        </View>

        {/* Action Buttons */}
        <View className="w-full space-y-4">
          <LoadingButton
            title="Complete Onboarding & Go to Home"
            onPress={handleCompleteOnboarding}
            variant="primary"
          />
          
          <LoadingButton
            title="Sign Out"
            onPress={handleSignOut}
            variant="outline"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}