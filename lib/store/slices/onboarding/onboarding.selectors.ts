/**
 * Onboarding Redux Selectors
 * Centralized selectors for onboarding state
 */

import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../index';

// Base selector
const selectOnboardingState = (state: RootState) => state.onboarding;

// Simple selectors
export const selectNativeLanguage = createSelector(
  selectOnboardingState,
  (onboarding) => onboarding.nativeLanguage
);

export const selectIndustry = createSelector(
  selectOnboardingState,
  (onboarding) => onboarding.industry
);

export const selectSelectedRole = createSelector(
  selectOnboardingState,
  (onboarding) => onboarding.selectedRole
);

export const selectCustomRole = createSelector(
  selectOnboardingState,
  (onboarding) => onboarding.customRole
);

export const selectJobTitle = createSelector(
  selectOnboardingState,
  (onboarding) => onboarding.jobTitle
);

export const selectJobDescription = createSelector(
  selectOnboardingState,
  (onboarding) => onboarding.jobDescription
);

export const selectRoleMatches = createSelector(
  selectOnboardingState,
  (onboarding) => onboarding.roleMatches
);

export const selectSelectedPartners = createSelector(
  selectOnboardingState,
  (onboarding) => onboarding.selectedPartners
);

export const selectPartnerSituations = createSelector(
  selectOnboardingState,
  (onboarding) => onboarding.partnerSituations
);

export const selectCurrentPartnerIndex = createSelector(
  selectOnboardingState,
  (onboarding) => onboarding.currentPartnerIndex
);

// Loading states
export const selectIsLoading = createSelector(
  selectOnboardingState,
  (onboarding) => onboarding.isLoading
);

export const selectIsSearchingRoles = createSelector(
  selectOnboardingState,
  (onboarding) => onboarding.isSearchingRoles
);

export const selectError = createSelector(
  selectOnboardingState,
  (onboarding) => onboarding.error
);

// Complex selectors
export const selectHasCompletedPart1 = createSelector(
  selectOnboardingState,
  (onboarding) => !!(
    onboarding.nativeLanguage &&
    onboarding.industry &&
    (onboarding.selectedRole || onboarding.customRole)
  )
);

export const selectHasCompletedPart2 = createSelector(
  selectOnboardingState,
  (onboarding) => {
    const hasPartners = onboarding.selectedPartners.length > 0;
    const allPartnersHaveSituations = onboarding.selectedPartners.every(
      partnerId => onboarding.partnerSituations[partnerId]?.length > 0
    );
    return hasPartners && allPartnersHaveSituations;
  }
);

export const selectCurrentPartner = createSelector(
  selectOnboardingState,
  (onboarding) => {
    const currentPartnerId = onboarding.selectedPartners[onboarding.currentPartnerIndex];
    return currentPartnerId || null;
  }
);

// Progress calculation selector
export const calculateOnboardingProgress = createSelector(
  selectOnboardingState,
  (state) => {
    let progress = 0;
    
    // Part 1 progress
    if (state.nativeLanguage) progress = 0.125;
    if (state.industry) progress = 0.25;
    if (state.jobTitle && state.jobDescription) progress = 0.375;
    if (state.roleMatches.length > 0) progress = 0.5;
    if (state.selectedRole || state.customRole) progress = 0.625;
    
    // Part 2 progress
    if (state.selectedPartners.length > 0) progress = 0.75;
    
    // Check if all partners have situations selected
    const allPartnersHaveSituations = state.selectedPartners.every(
      partnerId => state.partnerSituations[partnerId]?.length > 0
    );
    if (allPartnersHaveSituations && state.selectedPartners.length > 0) {
      progress = 0.875;
    }
    
    // Summary screen shows full progress
    if (state.part2Complete) progress = 1.0;
    
    return progress;
  }
);