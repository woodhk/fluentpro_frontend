// lib/types.ts

export interface User {
  id: string;
  email: string;
  full_name: string;
  is_active: boolean;
}

export interface SignUpRequest {
  email: string;
  password: string;
  full_name: string;
}

export interface SignInRequest {
  email: string;
  password: string;
}

// Updated to match backend response
export interface AuthResponse {
  success: boolean;
  message: string;
  user_id?: string;
  auth0_id?: string;
}

// New interface for login response
export interface LoginResponse {
  success: boolean;
  message: string;
  access_token: string;
  user: User;
}

export interface AuthState {
  isLoading: boolean;
  isSignedIn: boolean;
  user: User | null;
  token: string | null;
}

export interface ApiError {
  message: string;
  details?: string;
}

// Form validation types
export interface ValidationErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  fullName?: string;
  general?: string;
}

// Navigation types for Expo Router
export interface RootStackParamList {
  index: undefined;
  '(auth)': undefined;
  '(root)': undefined;
}

export interface AuthStackParamList {
  'sign-in': undefined;
  'sign-up': undefined;
}

export interface AppStackParamList {
  home: undefined;
  onboarding: undefined;
}