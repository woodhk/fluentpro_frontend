/**
 * Base API client with common request handling
 */

import { storage } from '@/lib/services/storage.service';
import { ApiError } from '@/types/api/common.types';

const API_BASE_URL = 'https://fluentpro-backend.onrender.com/api/v1';

export class BaseApiClient {
  protected baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  /**
   * Make authenticated request with token from storage
   */
  protected async makeRequest<T>(
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
}