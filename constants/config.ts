/**
 * Application Configuration
 */

export const API_CONFIG = {
  BASE_URL: 'https://fluentpro-backend.onrender.com/api/v1',
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
};

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'fluentpro_auth_token',
  USER_DATA: '@fluentpro/user_data',
  ONBOARDING_STATUS: '@fluentpro/onboarding_status',
};

export const APP_CONFIG = {
  NAME: 'FluentPro',
  VERSION: '1.0.0',
  MIN_PASSWORD_LENGTH: 8,
};