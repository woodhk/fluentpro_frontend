// lib/storage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from './types';

const STORAGE_KEYS = {
  AUTH_TOKEN: '@fluentpro/auth_token',
  USER_DATA: '@fluentpro/user_data',
  ONBOARDING_STATUS: '@fluentpro/onboarding_status',
} as const;

export const storage = {
  /**
   * Store authentication token securely
   */
  async setAuthToken(token: string): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
    } catch (error) {
      console.error('Failed to store auth token:', error);
      throw new Error('Failed to store authentication token');
    }
  },

  /**
   * Retrieve authentication token
   */
  async getAuthToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    } catch (error) {
      console.error('Failed to retrieve auth token:', error);
      return null;
    }
  },

  /**
   * Store user data
   */
  async setUserData(user: User): Promise<void> {
    try {
      const userData = JSON.stringify(user);
      await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, userData);
    } catch (error) {
      console.error('Failed to store user data:', error);
      throw new Error('Failed to store user data');
    }
  },

  /**
   * Retrieve user data
   */
  async getUserData(): Promise<User | null> {
    try {
      const userData = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Failed to retrieve user data:', error);
      return null;
    }
  },

  /**
   * Store onboarding completion status
   */
  async setOnboardingStatus(completed: boolean): Promise<void> {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEYS.ONBOARDING_STATUS, 
        JSON.stringify(completed)
      );
    } catch (error) {
      console.error('Failed to store onboarding status:', error);
    }
  },

  /**
   * Check if onboarding is completed
   */
  async getOnboardingStatus(): Promise<boolean> {
    try {
      const status = await AsyncStorage.getItem(STORAGE_KEYS.ONBOARDING_STATUS);
      return status ? JSON.parse(status) : false;
    } catch (error) {
      console.error('Failed to retrieve onboarding status:', error);
      return false;
    }
  },

  /**
   * Clear all authentication data (used for sign out)
   */
  async clearAuthData(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.AUTH_TOKEN,
        STORAGE_KEYS.USER_DATA,
        STORAGE_KEYS.ONBOARDING_STATUS,
      ]);
    } catch (error) {
      console.error('Failed to clear auth data:', error);
      throw new Error('Failed to clear authentication data');
    }
  },

  /**
   * Check if user is authenticated (has valid token)
   */
  async isAuthenticated(): Promise<boolean> {
    try {
      const token = await this.getAuthToken();
      return token !== null;
    } catch (error) {
      console.error('Failed to check authentication status:', error);
      return false;
    }
  },
};