// lib/auth.ts
import { SignUpRequest, SignInRequest, User, AuthState, ApiError } from './types';
import { apiClient, createMockToken } from './api';
import { storage } from './storage';

class AuthService {
  /**
   * Sign up a new user
   */
  async signUp(signUpData: SignUpRequest): Promise<{ success: boolean; user?: User }> {
    try {
      // Call the backend signup API
      const response = await apiClient.signUp(signUpData);
      
      if (response.success && response.user_id) {
        // Create mock token for development
        const token = createMockToken(response.user_id);
        
        // Store the authentication token
        await storage.setAuthToken(token);
        
        // Create user object from signup data
        const user: User = {
          id: response.user_id,
          email: signUpData.email,
          full_name: signUpData.full_name,
          date_of_birth: signUpData.date_of_birth,
          is_active: true,
        };
        
        // Store user data
        await storage.setUserData(user);
        
        return { success: true, user };
      } else {
        throw new Error(response.message || 'Signup failed');
      }
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  }

  /**
   * Sign in an existing user
   */
  async signIn(signInData: SignInRequest): Promise<{ success: boolean; user?: User }> {
    try {
      // For demo purposes, create a mock successful login
      // In production, this would call the actual login API
      const response = await apiClient.signIn(signInData);
      
      if (response.success && response.user_id) {
        // Create mock token
        const token = createMockToken(response.user_id);
        
        // Store the token
        await storage.setAuthToken(token);
        
        // Create mock user data for demo
        const user: User = {
          id: response.user_id,
          email: signInData.email,
          full_name: 'Demo User',
          is_active: true,
        };
        
        // Store user data
        await storage.setUserData(user);
        
        return { success: true, user };
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  }

  /**
   * Sign out the current user
   */
  async signOut(): Promise<void> {
    try {
      // Clear all stored authentication data
      await storage.clearAuthData();
    } catch (error) {
      console.error('Sign out error:', error);
      throw new Error('Failed to sign out');
    }
  }

  /**
   * Get current authentication state
   */
  async getAuthState(): Promise<AuthState> {
    try {
      const [token, user] = await Promise.all([
        storage.getAuthToken(),
        storage.getUserData(),
      ]);

      return {
        isLoading: false,
        isSignedIn: token !== null && user !== null,
        user,
        token,
      };
    } catch (error) {
      console.error('Failed to get auth state:', error);
      return {
        isLoading: false,
        isSignedIn: false,
        user: null,
        token: null,
      };
    }
  }

  /**
   * Check if user needs onboarding
   */
  async needsOnboarding(): Promise<boolean> {
    try {
      const onboardingCompleted = await storage.getOnboardingStatus();
      return !onboardingCompleted;
    } catch (error) {
      console.error('Failed to check onboarding status:', error);
      return true; // Default to needing onboarding if check fails
    }
  }

  /**
   * Mark onboarding as completed
   */
  async completeOnboarding(): Promise<void> {
    try {
      await storage.setOnboardingStatus(true);
    } catch (error) {
      console.error('Failed to mark onboarding as completed:', error);
      throw new Error('Failed to update onboarding status');
    }
  }

  /**
   * Validate authentication token and refresh user data
   */
  async validateSession(): Promise<boolean> {
    try {
      const token = await storage.getAuthToken();
      if (!token) {
        return false;
      }

      // In production, you might want to verify the token with the backend
      // const status = await apiClient.getAuthStatus();
      // return status.authenticated;

      // For demo purposes, assume token is valid if it exists
      return true;
    } catch (error) {
      console.error('Session validation error:', error);
      // Clear invalid authentication data
      await storage.clearAuthData();
      return false;
    }
  }
}

export const authService = new AuthService();