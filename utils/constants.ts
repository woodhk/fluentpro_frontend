// utils/constants.ts

export const API_CONFIG = {
  BASE_URL: 'https://fluentpro-backend.onrender.com/api/v1',
  TIMEOUT: 10000, // 10 seconds
} as const;

export const STORAGE_KEYS = {
  AUTH_TOKEN: '@fluentpro/auth_token',
  USER_DATA: '@fluentpro/user_data',
  ONBOARDING_STATUS: '@fluentpro/onboarding_status',
} as const;

export const VALIDATION_RULES = {
  PASSWORD: {
    MIN_LENGTH: 8,
    REQUIRES_UPPERCASE: true,
    REQUIRES_LOWERCASE: true,
    REQUIRES_NUMBER: true,
    REQUIRES_SPECIAL: true,
  },
  NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 100,
  },
  AGE: {
    MIN_AGE: 13,
    MAX_AGE: 120,
  },
} as const;

export const ROUTES = {
  AUTH: {
    SIGN_IN: '/(auth)/sign-in',
    SIGN_UP: '/(auth)/sign-up',
  },
  APP: {
    HOME: '/(app)/home',
    ONBOARDING: '/(app)/onboarding',
  },
  LOADING: 'index',
} as const;

export const COLORS = {
  PRIMARY: '#234BFF',
  SUCCESS: '#34C759',
  ERROR: '#FF3B30',
  WARNING: '#FF9500',
  NEUTRAL: '#8E8E93',
} as const;

export const FORM_CONFIG = {
  DEBOUNCE_MS: 300,
  AUTO_SAVE_DELAY: 1000,
} as const;