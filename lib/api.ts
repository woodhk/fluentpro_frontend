// lib/api.ts
import { SignUpRequest, SignInRequest, AuthResponse, User, ApiError } from './types';
import { storage } from './storage';

const API_BASE_URL = 'https://fluentpro-backend.onrender.com/api/v1';

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  /**
   * Make authenticated request with token from storage
   */
  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const token = await storage.getAuthToken();

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      // Handle different response types
      const contentType = response.headers.get('content-type');
      let data: any;
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      if (!response.ok) {
        // Handle API errors
        const error: ApiError = {
          message: data?.detail || data?.message || `HTTP ${response.status}`,
          details: typeof data === 'string' ? data : JSON.stringify(data),
        };
        throw error;
      }

      return data;
    } catch (error) {
      console.error('API Request failed:', error);
      
      if (error instanceof Error && 'message' in error) {
        throw error;
      }
      
      // Handle network errors
      throw new Error('Network request failed. Please check your connection.');
    }
  }

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
   * Note: Backend doesn't have a direct login endpoint, so we'll use signup for demo
   * In production, you'd have a separate login endpoint
   */
  async signIn(signInData: SignInRequest): Promise<AuthResponse> {
    // For demo purposes, we'll create a mock response
    // In production, replace this with actual login API call
    console.warn('Sign in endpoint not implemented in backend. Creating mock response.');
    
    // Mock successful login - in production, replace with:
    // return this.makeRequest<AuthResponse>('/auth/signin', {
    //   method: 'POST',
    //   body: JSON.stringify(signInData),
    // });
    
    return {
      success: true,
      message: 'Login successful (demo mode)',
      user_id: 'demo-user-id',
      auth0_id: 'demo-auth0-id',
    };
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

export const apiClient = new ApiClient();

/**
 * Create a mock JWT token for testing
 * In production, this would come from the backend
 */
export function createMockToken(userId: string): string {
  const payload = {
    sub: userId,
    email: 'demo@example.com',
    name: 'Demo User',
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), // 24 hours
  };
  
  // This is a mock token - in production, use the token from backend
  return `mock.${btoa(JSON.stringify(payload))}.signature`;
}