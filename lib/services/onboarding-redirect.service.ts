/**
 * Service for handling onboarding redirect logic
 */

import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '@clerk/clerk-expo';
import { onboardingApi } from '@/lib/api/onboarding.api';

type OnboardingRedirectState = {
  loading: boolean;
  error: string | null;
};

export const useOnboardingRedirect = () => {
  const router = useRouter();
  const { isSignedIn, isLoaded } = useAuth();
  const [state, setState] = useState<OnboardingRedirectState>({
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (isLoaded) {
      checkOnboardingStatus();
    }
  }, [isLoaded, isSignedIn]);

  const checkOnboardingStatus = async () => {
    try {
      setState({ loading: true, error: null });

      if (isSignedIn) {
        // User is authenticated with Clerk, check onboarding status
        try {
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
        } catch (onboardingError) {
          console.error('Failed to check onboarding status:', onboardingError);
          // On error, default to onboarding welcome
          router.replace('/(root)/(onboarding)/welcome');
        }
      } else {
        // Not authenticated, redirect to welcome screen
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