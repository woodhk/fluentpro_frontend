/**
 * API module exports
 * Provides backwards compatibility with existing code
 */

// Export individual API modules
export { authApi } from './auth.api';
export { onboardingApi } from './onboarding.api';

// Import for backwards compatible apiClient
import { authApi } from './auth.api';
import { onboardingApi } from './onboarding.api';

/**
 * Backwards compatible apiClient
 * This allows existing code to work without changes
 */
export const apiClient = {
  // Auth methods
  signUp: authApi.signUp.bind(authApi),
  signIn: authApi.signIn.bind(authApi),
  getAuthStatus: authApi.getAuthStatus.bind(authApi),
  getCurrentUser: authApi.getCurrentUser.bind(authApi),
  verifyToken: authApi.verifyToken.bind(authApi),
  
  // Onboarding methods
  setNativeLanguage: onboardingApi.setNativeLanguage.bind(onboardingApi),
  setIndustry: onboardingApi.setIndustry.bind(onboardingApi),
  searchRoles: onboardingApi.searchRoles.bind(onboardingApi),
  selectRole: onboardingApi.selectRole.bind(onboardingApi),
  getCommunicationPartners: onboardingApi.getCommunicationPartners.bind(onboardingApi),
  selectCommunicationPartners: onboardingApi.selectCommunicationPartners.bind(onboardingApi),
  selectCommunicationSituations: onboardingApi.selectCommunicationSituations.bind(onboardingApi),
  getOnboardingSummary: onboardingApi.getOnboardingSummary.bind(onboardingApi),
  completeOnboarding: onboardingApi.completeOnboarding.bind(onboardingApi),
};