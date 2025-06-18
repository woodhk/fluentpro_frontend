/**
 * User domain models
 */

// Core user model
export interface User {
  id: string;
  email: string;
  full_name: string;
  is_active: boolean;
}

// Authentication state
export interface AuthState {
  isLoading: boolean;
  isSignedIn: boolean;
  user: User | null;
  token: string | null;
}

// User profile extensions
export interface UserProfile extends User {
  created_at?: string;
  updated_at?: string;
  native_language?: string;
  industry?: string;
  role?: string;
}