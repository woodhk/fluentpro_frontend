/**
 * Application Configuration
 */

export const API_CONFIG = {
  BASE_URL: process.env.EXPO_PUBLIC_API_URL || 'https://fluentpro-backend.onrender.com/api/v1',
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
};

export const CLERK_CONFIG = {
  PUBLISHABLE_KEY: process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY || '',
};

export const STORAGE_KEYS = {
  USER_DATA: '@fluentpro/user_data',
  ONBOARDING_STATUS: '@fluentpro/onboarding_status',
};

export const APP_CONFIG = {
  NAME: 'FluentPro',
  VERSION: '1.0.0',
  MIN_PASSWORD_LENGTH: 8,
};