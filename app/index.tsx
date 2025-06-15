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
      
      if (authState.isSignedIn && authState.user && authState.token) {
        // Validate session with backend to ensure token is still valid
        const isSessionValid = await authService.validateSession();
        
        if (isSessionValid) {
          // User is signed in with valid session, check if they need onboarding
          const needsOnboarding = await authService.needsOnboarding();
          
          if (needsOnboarding) {
            // Redirect to onboarding
            router.replace('/(root)/onboarding');
          } else {
            // Redirect to main app
            router.replace('/(root)/(tabs)/home');
          }
        } else {
          // Session is invalid, redirect to auth flow
          router.replace('/(auth)/sign-in');
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