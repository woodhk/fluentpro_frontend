/**
 * Onboarding Async Thunks
 * All async operations for onboarding
 */

import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '@/lib/api';
import { 
  RoleSearchRequest, 
  RoleSelectionRequest,
  CommunicationPartnerSelectionRequest,
  SituationSelectionRequest 
} from '@/types/api/onboarding.types';

// Types for thunk parameters
export type NativeLanguage = 'english' | 'chinese_traditional' | 'chinese_simplified';
export type Industry = 'banking_finance' | 'shipping_logistics' | 'real_estate' | 'hotels_hospitality';

// Async thunk for setting native language
export const setNativeLanguage = createAsyncThunk(
  'onboarding/setNativeLanguage',
  async (language: NativeLanguage, { rejectWithValue }) => {
    try {
      const response = await apiClient.setNativeLanguage(language);
      return { language, response };
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to set native language');
    }
  }
);

// Async thunk for setting industry
export const setIndustry = createAsyncThunk(
  'onboarding/setIndustry',
  async (industry: Industry, { rejectWithValue }) => {
    try {
      const response = await apiClient.setIndustry(industry);
      return { industry, response };
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to set industry');
    }
  }
);

// Async thunk for searching roles
export const searchRoles = createAsyncThunk(
  'onboarding/searchRoles',
  async (searchData: RoleSearchRequest, { rejectWithValue }) => {
    try {
      const response = await apiClient.searchRoles(searchData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to search roles');
    }
  }
);

// Async thunk for selecting a role
export const selectRole = createAsyncThunk(
  'onboarding/selectRole',
  async (selectionData: RoleSelectionRequest, { rejectWithValue }) => {
    try {
      const response = await apiClient.selectRole(selectionData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to select role');
    }
  }
);

// Async thunk for fetching available communication partners
export const fetchCommunicationPartners = createAsyncThunk(
  'onboarding/fetchCommunicationPartners',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.getCommunicationPartners();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch communication partners');
    }
  }
);

// Async thunk for selecting communication partners
export const selectCommunicationPartners = createAsyncThunk(
  'onboarding/selectCommunicationPartners',
  async (selectionData: CommunicationPartnerSelectionRequest, { rejectWithValue }) => {
    try {
      const response = await apiClient.selectCommunicationPartners(selectionData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to select communication partners');
    }
  }
);

// Async thunk for selecting communication situations
export const selectCommunicationSituations = createAsyncThunk(
  'onboarding/selectCommunicationSituations',
  async (selectionData: SituationSelectionRequest, { rejectWithValue }) => {
    try {
      const response = await apiClient.selectCommunicationSituations(selectionData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to select communication situations');
    }
  }
);