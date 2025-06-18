/**
 * Onboarding API endpoints
 */

import { BaseApiClient } from './client';
import {
  RoleSearchRequest,
  RoleSearchResponse,
  RoleSelectionRequest,
  RoleSelectionResponse,
  CommunicationPartnersResponse,
  CommunicationPartnerSelectionRequest,
  CommunicationPartnerSelectionResponse,
  SituationSelectionRequest,
  SituationSelectionResponse,
  OnboardingSummaryResponse
} from '@/types/api/onboarding.types';

export class OnboardingApi extends BaseApiClient {
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

  /**
   * Select communication situations for a specific partner
   */
  async selectCommunicationSituations(selectionData: SituationSelectionRequest): Promise<SituationSelectionResponse> {
    return this.makeRequest('/onboarding/part-2/select-situations', {
      method: 'POST',
      body: JSON.stringify(selectionData),
    });
  }

  /**
   * Get onboarding summary for part 3
   */
  async getOnboardingSummary(): Promise<OnboardingSummaryResponse> {
    return this.makeRequest('/onboarding/part-3/summary');
  }

  /**
   * Complete the entire onboarding process
   */
  async completeOnboarding(): Promise<{ success: boolean; message: string; onboarding_status: string; next_steps: string }> {
    return this.makeRequest('/onboarding/part-3/complete', {
      method: 'POST',
    });
  }
}

// Export singleton instance
export const onboardingApi = new OnboardingApi();