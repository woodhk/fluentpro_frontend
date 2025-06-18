/**
 * Onboarding API types
 */

// Role-related types
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

// Communication Partners types
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

// Communication Situations types
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

// Onboarding Summary types
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