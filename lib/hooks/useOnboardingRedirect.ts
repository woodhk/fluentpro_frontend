/**
 * Hook for handling onboarding redirect logic
 */

import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { onboardingApi } from '@/lib/api/onboarding.api';
import { authService } from '@/lib/services/auth.service';

type OnboardingRedirectState = {
  loading: boolean;
  error: string | null;
};

export const useOnboardingRedirect = () => {
  const router = useRouter();
  const [state, setState] = useState<OnboardingRedirectState>({
    loading: true,
    error: null,
  });

  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  const checkOnboardingStatus = async () => {
    try {
      setState({ loading: true, error: null });

      // Get current authentication state from cache
      const authState = await authService.getAuthState();
      
      if (authState.isSignedIn && authState.user && authState.token) {
        // User has cached auth, validate session with backend
        const isSessionValid = await authService.validateSession();
        
        if (isSessionValid) {
          // Session is valid, check onboarding status
          const onboardingStatus = await onboardingApi.getOnboardingStatus();

          if (onboardingStatus.completed) {
            // Onboarding complete, redirect to home
            router.replace('/(root)/(tabs)/home');
          } else {
            // Onboarding not complete, redirect to onboarding welcome
            const incompleteSteps = [
              'not_started',
              'native_language',
              'industry_selection',
              'role_input',
              'role_select',
              'communication_partners',
              'situation_selection',
              'summary'
            ];

            if (incompleteSteps.includes(onboardingStatus.current_step)) {
              router.replace('/(root)/(onboarding)/welcome');
            } else {
              // Unknown step, redirect to onboarding welcome as fallback
              router.replace('/(root)/(onboarding)/welcome');
            }
          }
        } else {
          // Session is invalid, redirect to welcome screen
          router.replace('/(auth)/welcome');
        }
      } else {
        // No cached user, redirect to welcome screen
        router.replace('/(auth)/welcome');
      }

      setState({ loading: false, error: null });
    } catch (error) {
      console.error('Onboarding redirect error:', error);
      setState({ 
        loading: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      });
      
      // On error, redirect to welcome screen as fallback
      router.replace('/(auth)/welcome');
    }
  };

  return {
    ...state,
    checkOnboardingStatus,
  };
};