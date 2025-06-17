import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { apiClient } from '../api';
import { RoleMatch, RoleSearchRequest, RoleSelectionRequest, CommunicationPartnerAPI, CommunicationPartnerSelectionRequest } from '../types';

export type NativeLanguage = 'english' | 'chinese_traditional' | 'chinese_simplified';
export type Industry = 'banking_finance' | 'shipping_logistics' | 'real_estate' | 'hotels_hospitality';

interface OnboardingState {
  // Part 1 data
  nativeLanguage: NativeLanguage | null;
  industry: Industry | null;
  jobTitle: string;
  jobDescription: string;
  roleMatches: RoleMatch[];
  selectedRole: RoleMatch | null;
  customRole: { title: string; description: string } | null;
  
  // Part 2 data
  availablePartners: CommunicationPartnerAPI[];
  selectedPartners: string[];
  
  // API states
  isLoading: boolean;
  isSearchingRoles: boolean;
  isLoadingPartners: boolean;
  error: string | null;
  
  // Progress tracking
  part1Complete: boolean;
  part2Complete: boolean;
  part3Complete: boolean;
}

const initialState: OnboardingState = {
  nativeLanguage: null,
  industry: null,
  jobTitle: '',
  jobDescription: '',
  roleMatches: [],
  selectedRole: null,
  customRole: null,
  availablePartners: [],
  selectedPartners: [],
  isLoading: false,
  isSearchingRoles: false,
  isLoadingPartners: false,
  error: null,
  part1Complete: false,
  part2Complete: false,
  part3Complete: false,
};

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

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    // Local state updates (for optimistic updates)
    updateNativeLanguage: (state, action: PayloadAction<NativeLanguage>) => {
      state.nativeLanguage = action.payload;
    },
    updateIndustry: (state, action: PayloadAction<Industry>) => {
      state.industry = action.payload;
    },
    updateJobTitle: (state, action: PayloadAction<string>) => {
      state.jobTitle = action.payload;
    },
    updateJobDescription: (state, action: PayloadAction<string>) => {
      state.jobDescription = action.payload;
    },
    updateSelectedRole: (state, action: PayloadAction<RoleMatch | null>) => {
      state.selectedRole = action.payload;
      // Clear custom role when selecting a predefined role
      if (action.payload) {
        state.customRole = null;
      }
    },
    updateCustomRole: (state, action: PayloadAction<{ title: string; description: string } | null>) => {
      state.customRole = action.payload;
      // Clear selected role when setting custom role
      if (action.payload) {
        state.selectedRole = null;
      }
    },
    updateSelectedPartners: (state, action: PayloadAction<string[]>) => {
      state.selectedPartners = action.payload;
    },
    togglePartnerSelection: (state, action: PayloadAction<string>) => {
      const partnerId = action.payload;
      if (state.selectedPartners.includes(partnerId)) {
        state.selectedPartners = state.selectedPartners.filter(id => id !== partnerId);
      } else {
        state.selectedPartners.push(partnerId);
      }
    },
    clearRoleMatches: (state) => {
      state.roleMatches = [];
      state.selectedRole = null;
      state.customRole = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    resetOnboarding: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      // Native Language cases
      .addCase(setNativeLanguage.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(setNativeLanguage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.nativeLanguage = action.payload.language;
        state.error = null;
      })
      .addCase(setNativeLanguage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Industry cases
      .addCase(setIndustry.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(setIndustry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.industry = action.payload.industry;
        state.error = null;
      })
      .addCase(setIndustry.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Role search cases
      .addCase(searchRoles.pending, (state) => {
        state.isSearchingRoles = true;
        state.error = null;
      })
      .addCase(searchRoles.fulfilled, (state, action) => {
        state.isSearchingRoles = false;
        state.roleMatches = action.payload.matches;
        state.error = null;
      })
      .addCase(searchRoles.rejected, (state, action) => {
        state.isSearchingRoles = false;
        state.error = action.payload as string;
        state.roleMatches = [];
      })
      // Role selection cases
      .addCase(selectRole.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(selectRole.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        // Mark part 1 as complete when role is selected
        state.part1Complete = true;
      })
      .addCase(selectRole.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Communication partners fetch cases
      .addCase(fetchCommunicationPartners.pending, (state) => {
        state.isLoadingPartners = true;
        state.error = null;
      })
      .addCase(fetchCommunicationPartners.fulfilled, (state, action) => {
        state.isLoadingPartners = false;
        state.availablePartners = action.payload.partners;
        state.error = null;
      })
      .addCase(fetchCommunicationPartners.rejected, (state, action) => {
        state.isLoadingPartners = false;
        state.error = action.payload as string;
      })
      // Communication partners selection cases
      .addCase(selectCommunicationPartners.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(selectCommunicationPartners.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        // Mark part 2 as complete when partners are selected
        state.part2Complete = true;
      })
      .addCase(selectCommunicationPartners.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { 
  updateNativeLanguage, 
  updateIndustry, 
  updateJobTitle, 
  updateJobDescription, 
  updateSelectedRole, 
  updateCustomRole, 
  updateSelectedPartners,
  togglePartnerSelection,
  clearRoleMatches, 
  clearError, 
  resetOnboarding 
} = onboardingSlice.actions;
export default onboardingSlice.reducer;