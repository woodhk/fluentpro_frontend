/**
 * Authentication API types
 */

import { User } from '../models/user.types';

// Request types
export interface SignUpRequest {
  email: string;
  password: string;
  full_name: string;
}

export interface SignInRequest {
  email: string;
  password: string;
}

// Response types
export interface AuthResponse {
  success: boolean;
  message: string;
  user_id?: string;
  auth0_id?: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  access_token: string;
  user: User;
}

// Validation types  
export interface ValidationErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  fullName?: string;
  general?: string;
}