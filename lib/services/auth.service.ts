// lib/auth.ts
import { SignUpRequest, SignInRequest } from '@/types/api/auth.types';
import { User, AuthState } from '@/types/models/user.types';
import { ApiError } from '@/types/api/common.types';
import { apiClient } from '@/lib/api';
import { storage } from './storage.service';

class AuthService {
  /**
   * Sign up a new user and automatically sign them in
   */
  async signUp(signUpData: SignUpRequest): Promise<{ success: boolean; user?: User }> {
    try {
      console.log('AuthService: Starting signup process');
      
      // Call the backend signup API
      const response = await apiClient.signUp(signUpData);
      
      if (response.success && response.user_id) {
        console.log('AuthService: Signup successful, now automatically signing in');
        
        // Automatically sign in the user after successful signup
        try {
          const loginResult = await this.signIn({
            email: signUpData.email,
            password: signUpData.password,
          });
          
          if (loginResult.success && loginResult.user) {
            console.log('AuthService: Auto-login after signup successful');
            return { success: true, user: loginResult.user };
          } else {
            throw new Error('Failed to automatically sign in after signup');
          }
        } catch (loginError) {
          console.error('AuthService: Auto-login after signup failed:', loginError);
          // If auto-login fails, still return success but indicate user needs to login manually
          const user: User = {
            id: response.user_id,
            email: signUpData.email,
            full_name: signUpData.full_name,
            is_active: true,
          };
          
          // Don't throw error, but user will need to login manually
          console.warn('User created but auto-login failed. User will need to login manually.');
          return { success: true, user };
        }
      } else {
        throw new Error(response.message || 'Signup failed');
      }
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  }

  /**
   * Sign in an existing user - REAL IMPLEMENTATION with detailed error handling
   */
  async signIn(signInData: SignInRequest): Promise<{ success: boolean; user?: User }> {
    try {
      console.log('AuthService: Starting sign in process');
      
      // Call the real backend login API
      const response = await apiClient.signIn(signInData);
      
      console.log('AuthService: Received login response:', {
        success: response.success,
        hasToken: !!response.access_token,
        hasUser: !!response.user,
      });
      
      if (response.success && response.access_token && response.user) {
        console.log('AuthService: Storing token and user data');
        
        // Store the real JWT token securely
        try {
          await storage.setAuthToken(response.access_token);
          console.log('AuthService: Token stored successfully');
        } catch (storageError) {
          console.error('AuthService: Failed to store token:', storageError);
          throw new Error('Failed to store authentication token');
        }
        
        // Store user data
        try {
          await storage.setUserData(response.user);
          console.log('AuthService: User data stored successfully');
        } catch (userStorageError) {
          console.error('AuthService: Failed to store user data:', userStorageError);
          // Don't fail login if user data storage fails
        }
        
        return { success: true, user: response.user };
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error) {
      console.error('Sign in error:', error);
      
      // Handle specific error types
      if (error && typeof error === 'object' && 'message' in error) {
        const errorMessage = (error as ApiError).message;
        
        // Handle storage errors specifically
        if (errorMessage.includes('store') || errorMessage.includes('storage')) {
          throw new Error('Failed to save login information. Please try again.');
        }
        
        // Check for common login errors
        if (errorMessage.toLowerCase().includes('invalid') || 
            errorMessage.toLowerCase().includes('incorrect') ||
            errorMessage.toLowerCase().includes('unauthorized') ||
            errorMessage.includes('422')) {
          throw new Error('Invalid email or password. Please try again.');
        }
        
        if (errorMessage.toLowerCase().includes('network') ||
            errorMessage.toLowerCase().includes('connection')) {
          throw new Error('Unable to connect to the server. Please check your internet connection.');
        }
        
        throw new Error(errorMessage);
      }
      
      throw new Error('Login failed. Please check your connection and try again.');
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
   * Validate authentication token and refresh user data if needed
   */
  async validateSession(): Promise<boolean> {
    try {
      const token = await storage.getAuthToken();
      if (!token) {
        console.log('AuthService: No token found during session validation');
        return false;
      }

      console.log('AuthService: Validating session with backend');
      
      // Verify token with backend
      const status = await apiClient.getAuthStatus();
      
      if (status.authenticated) {
        console.log('AuthService: Session is valid');
        // Optionally refresh user data
        try {
          const user = await apiClient.getCurrentUser();
          await storage.setUserData(user);
        } catch (userError) {
          console.warn('Failed to refresh user data:', userError);
          // Don't fail validation just because user data refresh failed
        }
        return true;
      } else {
        console.log('AuthService: Session is invalid, clearing auth data');
        // Token is invalid, clear auth data
        await storage.clearAuthData();
        return false;
      }
    } catch (error) {
      console.error('Session validation error:', error);
      // Clear invalid authentication data
      await storage.clearAuthData();
      return false;
    }
  }

  /**
   * Refresh user data from backend
   */
  async refreshUserData(): Promise<User | null> {
    try {
      const user = await apiClient.getCurrentUser();
      await storage.setUserData(user);
      return user;
    } catch (error) {
      console.error('Failed to refresh user data:', error);
      return null;
    }
  }
}

export const authService = new AuthService();