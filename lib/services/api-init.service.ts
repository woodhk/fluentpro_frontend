/**
 * Service to initialize API clients with Clerk authentication
 */

import { onboardingApi } from '@/lib/api/onboarding.api';

export const initializeApiClients = (getToken: () => Promise<string | null>) => {
  // Initialize API clients with Clerk token provider
  onboardingApi.setTokenProvider(getToken);
  
  console.log('API clients initialized with Clerk token provider');
};

export const apiInitService = {
  initializeApiClients,
};