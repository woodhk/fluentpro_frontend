// lib/storage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Keychain from 'react-native-keychain';
import { User } from './types';

const STORAGE_KEYS = {
  AUTH_TOKEN: '@fluentpro/auth_token', // Fallback to AsyncStorage
  USER_DATA: '@fluentpro/user_data',
  ONBOARDING_STATUS: '@fluentpro/onboarding_status',
} as const;

const KEYCHAIN_SERVICE = 'FluentPro';

export const storage = {
  /**
   * Store authentication token securely using Keychain with AsyncStorage fallback
   */
  async setAuthToken(token: string): Promise<void> {
    try {
      // Try Keychain first (more secure)
      await Keychain.setGenericPassword('auth_token', token, {
        service: KEYCHAIN_SERVICE,
      });
      console.log('Token stored in Keychain successfully');
    } catch (keychainError) {
      console.warn('Keychain failed, falling back to AsyncStorage:', keychainError);
      try {
        // Fallback to AsyncStorage
        await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
        console.log('Token stored in AsyncStorage successfully');
      } catch (asyncError) {
        console.error('Failed to store auth token in AsyncStorage:', asyncError);
        throw new Error('Failed to store authentication token');
      }
    }
  },

  /**
   * Retrieve authentication token from Keychain with AsyncStorage fallback
   */
  async getAuthToken(): Promise<string | null> {
    try {
      // Try Keychain first
      const credentials = await Keychain.getGenericPassword({
        service: KEYCHAIN_SERVICE,
      });
      
      if (credentials && credentials.password) {
        return credentials.password;
      }
      
      // Fallback to AsyncStorage
      const token = await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
      return token;
    } catch (error) {
      console.warn('Failed to retrieve auth token from Keychain, trying AsyncStorage:', error);
      try {
        const token = await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
        return token;
      } catch (asyncError) {
        console.error('Failed to retrieve auth token from AsyncStorage:', asyncError);
        return null;
      }
    }
  },

  /**
   * Clear authentication token from both Keychain and AsyncStorage
   */
  async clearAuthToken(): Promise<void> {
    try {
      // Clear from Keychain
      await Keychain.resetGenericPassword({
        service: KEYCHAIN_SERVICE,
      });
    } catch (keychainError) {
      console.warn('Failed to clear token from Keychain:', keychainError);
    }
    
    try {
      // Clear from AsyncStorage
      await AsyncStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    } catch (asyncError) {
      console.warn('Failed to clear token from AsyncStorage:', asyncError);
    }
  },

  /**
   * Store user data in AsyncStorage (non-sensitive)
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
   * Retrieve user data from AsyncStorage
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
      await Promise.all([
        this.clearAuthToken(),
        AsyncStorage.multiRemove([
          STORAGE_KEYS.USER_DATA,
          STORAGE_KEYS.ONBOARDING_STATUS,
        ])
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