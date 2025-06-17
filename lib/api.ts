// lib/api.ts
import { SignUpRequest, SignInRequest, AuthResponse, User, ApiError, LoginResponse, RoleSearchRequest, RoleSearchResponse, RoleSelectionRequest, RoleSelectionResponse, CommunicationPartnersResponse, CommunicationPartnerSelectionRequest, CommunicationPartnerSelectionResponse } from './types';
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

    // Debug logging
    console.log('API Request:', {
      method: config.method || 'GET',
      url,
      headers: config.headers,
      body: config.body,
    });

    try {
      const response = await fetch(url, config);
      
      // Debug logging
      console.log('API Response:', {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
      });
      
      // Handle different response types
      const contentType = response.headers.get('content-type');
      let data: any;
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      console.log('API Response Data:', data);

      if (!response.ok) {
        // Handle API errors
        const error: ApiError = {
          message: data?.detail || data?.message || `HTTP ${response.status}: ${response.statusText}`,
          details: typeof data === 'string' ? data : JSON.stringify(data),
        };
        console.error('API Error:', error);
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

  /**
   * Set user's native language for onboarding
   */
  async setNativeLanguage(language: 'english' | 'chinese_traditional' | 'chinese_simplified'): Promise<{
    success: boolean;
    message: string;
    native_language: string;
  }> {
    return this.makeRequest('/onboarding/part-1/native-language', {
      method: 'POST',
      body: JSON.stringify({ native_language: language }),
    });
  }

  /**
   * Set user's industry for onboarding
   */
  async setIndustry(industry: 'banking_finance' | 'shipping_logistics' | 'real_estate' | 'hotels_hospitality'): Promise<{
    success: boolean;
    message: string;
    industry: string;
    data: null;
    timestamp: string;
  }> {
    return this.makeRequest('/onboarding/part-1/industry', {
      method: 'POST',
      body: JSON.stringify({ industry }),
    });
  }

  /**
   * Search for roles based on job title and description
   */
  async searchRoles(searchData: RoleSearchRequest): Promise<RoleSearchResponse> {
    return this.makeRequest('/onboarding/part-1/search-roles', {
      method: 'POST',
      body: JSON.stringify(searchData),
    });
  }

  /**
   * Select a role or create a custom role
   */
  async selectRole(selectionData: RoleSelectionRequest): Promise<RoleSelectionResponse> {
    return this.makeRequest('/onboarding/part-1/select-role', {
      method: 'POST',
      body: JSON.stringify(selectionData),
    });
  }

  /**
   * Get available communication partners for onboarding part 2
   */
  async getCommunicationPartners(): Promise<CommunicationPartnersResponse> {
    return this.makeRequest('/onboarding/part-2/communication-partners');
  }

  /**
   * Select communication partners for onboarding part 2
   */
  async selectCommunicationPartners(selectionData: CommunicationPartnerSelectionRequest): Promise<CommunicationPartnerSelectionResponse> {
    return this.makeRequest('/onboarding/part-2/select-partners', {
      method: 'POST',
      body: JSON.stringify(selectionData),
    });
  }
}

export const apiClient = new ApiClient();