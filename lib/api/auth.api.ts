/**
 * Authentication API endpoints
 */

import { BaseApiClient } from './client';
import { 
  SignUpRequest, 
  SignInRequest, 
  AuthResponse, 
  LoginResponse 
} from '@/types/api/auth.types';
import { User } from '@/types/models/user.types';

export class AuthApi extends BaseApiClient {
  /**
   * Sign up new user
   */
  async signUp(signUpData: SignUpRequest): Promise<AuthResponse> {
    return this.makeRequest<AuthResponse>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(signUpData),
    });
  }

  /**
   * Sign in user
   */
  async signIn(signInData: SignInRequest): Promise<LoginResponse> {
    console.log('Attempting login with data:', {
      email: signInData.email,
      passwordLength: signInData.password.length,
    });

    return this.makeRequest<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email: signInData.email,
        password: signInData.password,
      }),
    });
  }

  /**
   * Get current user authentication status
   */
  async getAuthStatus(): Promise<{ authenticated: boolean; user_id?: string; message: string }> {
    return this.makeRequest('/auth/status');
  }

  /**
   * Get current user information
   */
  async getCurrentUser(): Promise<User> {
    return this.makeRequest<User>('/auth/me');
  }

  /**
   * Verify authentication token
   */
  async verifyToken(): Promise<{ valid: boolean; auth0_id: string; message: string }> {
    return this.makeRequest('/auth/verify');
  }
}

// Export singleton instance
export const authApi = new AuthApi();