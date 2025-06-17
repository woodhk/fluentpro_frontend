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

// Role-related types for onboarding
export interface RoleMatch {
  id: string;
  title: string;
  description: string;
  industry_name: string;
  confidence_score: number;
}

export interface RoleSearchRequest {
  job_title: string;
  job_description: string;
}

export interface RoleSearchResponse {
  success: boolean;
  message: string;
  matches: RoleMatch[];
  search_id: string | null;
}

export interface RoleSelectionRequest {
  role_id?: string;
  custom_title?: string;
  custom_description?: string;
}

export interface RoleSelectionResponse {
  success: boolean;
  message: string;
  role_id: string;
  is_custom: boolean;
}

// Communication Partners types for Part 2
export interface CommunicationPartnerAPI {
  id: string;
  name: string;
  description: string;
}

export interface CommunicationPartnersResponse {
  success: boolean;
  message: string;
  partners: CommunicationPartnerAPI[];
}

export interface CommunicationPartnerSelectionRequest {
  partner_ids: string[];
}

export interface CommunicationPartnerSelection {
  user_id: string;
  communication_partner_id: string;
  priority: number;
}

export interface CommunicationPartnerSelectionResponse {
  success: boolean;
  message: string;
  selected_count: number;
  partner_selections: CommunicationPartnerSelection[];
}

// Communication Situations types for Part 2
export interface CommunicationSituationAPI {
  id: string;
  name: string;
  icon: {
    library: string;
    name: string;
  };
}

export interface SituationSelectionRequest {
  partner_id: string;
  situation_ids: string[];
}

export interface SituationSelection {
  user_id: string;
  communication_partner_id: string;
  unit_id: string;
  priority: number;
  is_custom: boolean;
}

export interface SituationSelectionResponse {
  success: boolean;
  message: string;
  partner_id: string;
  selected_count: number;
  situation_selections: SituationSelection[];
}

// Onboarding Summary types for Part 3
export interface OnboardingSummaryRole {
  id: string;
  title: string;
  description: string;
  is_custom: boolean;
  industry_name: string;
}

export interface OnboardingSummarySituation {
  id: string;
  name: string;
  description: string;
  priority: number;
}

export interface OnboardingSummaryPartner {
  id: string;
  name: string;
  description: string;
  priority: number;
  situations: OnboardingSummarySituation[];
}

export interface OnboardingSummary {
  native_language: string;
  native_language_display: string;
  industry_id: string;
  industry_name: string;
  role: OnboardingSummaryRole;
  communication_partners: OnboardingSummaryPartner[];
  total_partners: number;
  total_situations: number;
  onboarding_status: string;
  is_complete: boolean;
}

export interface OnboardingSummaryResponse {
  success: boolean;
  message: string;
  summary: OnboardingSummary;
}