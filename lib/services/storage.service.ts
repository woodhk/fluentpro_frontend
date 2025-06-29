// lib/storage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '@/constants/config';

export const storage = {

  /**
   * Store user data in AsyncStorage (non-sensitive)
   */
  async setUserData(user: any): Promise<void> {
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
  async getUserData(): Promise<any | null> {
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
   * Clear all user data (used for sign out)
   */
  async clearUserData(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.USER_DATA,
        STORAGE_KEYS.ONBOARDING_STATUS,
      ]);
    } catch (error) {
      console.error('Failed to clear user data:', error);
      throw new Error('Failed to clear user data');
    }
  },
};