/**
 * Application Routes
 */

export const ROUTES = {
  AUTH: {
    WELCOME: '/(auth)/welcome',
    SIGN_IN: '/(auth)/sign-in',
    SIGN_UP: '/(auth)/sign-up',
  },
  ONBOARDING: {
    INDEX: '/(root)/(onboarding)',
    WELCOME: '/(root)/(onboarding)/welcome',
    PART_1: {
      INTRO: '/(root)/(onboarding)/part-01/intro',
      LANGUAGE: '/(root)/(onboarding)/part-01/language',
      INDUSTRY: '/(root)/(onboarding)/part-01/industry',
      ROLE_INPUT: '/(root)/(onboarding)/part-01/role-input',
      ROLE_SELECT: '/(root)/(onboarding)/part-01/role-select',
      COMPLETE: '/(root)/(onboarding)/part-01/complete',
    },
    PART_2: {
      INTRO: '/(root)/(onboarding)/part-02/intro',
      PARTNERS: '/(root)/(onboarding)/part-02/partners',
      SITUATIONS: '/(root)/(onboarding)/part-02/situations',
      COMPLETE: '/(root)/(onboarding)/part-02/complete',
    },
    PART_3: {
      SUMMARY: '/(root)/(onboarding)/part-03/summary',
      COMPLETE: '/(root)/(onboarding)/part-03/complete',
    },
  },
  APP: {
    TABS: {
      HOME: '/(root)/(tabs)/home',
      PROFILE: '/(root)/(tabs)/profile',
      REVIEW: '/(root)/(tabs)/review',
      ROLEPLAY: '/(root)/(tabs)/roleplay',
    },
  },
};