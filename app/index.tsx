// app/index.tsx
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { authService } from '../lib/auth';

export default function AuthLoadingScreen() {
  const router = useRouter();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      // Get current authentication state
      const authState = await authService.getAuthState();
      
      if (authState.isSignedIn && authState.user) {
        // User is signed in, check if they need onboarding
        const needsOnboarding = await authService.needsOnboarding();
        
        if (needsOnboarding) {
          // Redirect to onboarding
          router.replace('/(app)/onboarding');
        } else {
          // Redirect to main app
          router.replace('/(app)/home');
        }
      } else {
        // User is not signed in, redirect to auth flow
        router.replace('/(auth)/sign-in');
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      // On error, default to auth flow
      router.replace('/(auth)/sign-in');
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <LoadingSpinner
        message="Loading FluentPro..."
        fullScreen
      />
    </View>
  );
}