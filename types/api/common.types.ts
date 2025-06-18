/**
 * Common types used across all API calls
 */

// Generic API response wrapper
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  timestamp?: string;
}

// API error structure
export interface ApiError {
  message: string;
  details?: string;
  code?: string;
}

// For paginated responses
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// Request status
export type RequestStatus = 'idle' | 'loading' | 'success' | 'error';