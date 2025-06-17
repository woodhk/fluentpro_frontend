import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { apiClient } from '../api';
import { RoleMatch, RoleSearchRequest, RoleSelectionRequest, CommunicationPartnerAPI, CommunicationPartnerSelectionRequest, SituationSelectionRequest } from '../types';

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
  currentPartnerIndex: number;
  partnerSituations: { [partnerId: string]: string[] };
  
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
  currentPartnerIndex: 0,
  partnerSituations: {},
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
    updateCurrentPartnerIndex: (state, action: PayloadAction<number>) => {
      state.currentPartnerIndex = action.payload;
    },
    updatePartnerSituations: (state, action: PayloadAction<{ partnerId: string; situations: string[] }>) => {
      const { partnerId, situations } = action.payload;
      state.partnerSituations[partnerId] = situations;
    },
    toggleSituationSelection: (state, action: PayloadAction<{ partnerId: string; situationId: string }>) => {
      const { partnerId, situationId } = action.payload;
      const currentSituations = state.partnerSituations[partnerId] || [];
      
      if (currentSituations.includes(situationId)) {
        state.partnerSituations[partnerId] = currentSituations.filter(id => id !== situationId);
      } else {
        state.partnerSituations[partnerId] = [...currentSituations, situationId];
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
        // Don't mark part 2 as complete yet - need to select situations for each partner
      })
      .addCase(selectCommunicationPartners.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Communication situations selection cases
      .addCase(selectCommunicationSituations.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(selectCommunicationSituations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        // Check if all partners have situations selected
        const allPartnersHaveSituations = state.selectedPartners.every(
          partnerId => state.partnerSituations[partnerId]?.length > 0
        );
        if (allPartnersHaveSituations) {
          state.part2Complete = true;
        }
      })
      .addCase(selectCommunicationSituations.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

// Helper function to calculate onboarding progress
export const calculateOnboardingProgress = (state: OnboardingState): number => {
  // Total steps in onboarding: 8 screens from language to summary
  // 1. language (0.125)
  // 2. industry (0.25) 
  // 3. role-input (0.375)
  // 4. role-select (0.5)
  // 5. complete (0.625)
  // 6. intro (0.625 - same as complete)
  // 7. partners (0.75)
  // 8. situations (0.875)
  // 9. summary (1.0)
  
  let progress = 0;
  
  // Part 1 progress
  if (state.nativeLanguage) progress = 0.125;
  if (state.industry) progress = 0.25;
  if (state.jobTitle && state.jobDescription) progress = 0.375;
  if (state.roleMatches.length > 0) progress = 0.5;
  if (state.selectedRole || state.customRole) progress = 0.625;
  
  // Part 2 progress
  if (state.selectedPartners.length > 0) progress = 0.75;
  
  // Check if all partners have situations selected
  const allPartnersHaveSituations = state.selectedPartners.every(
    partnerId => state.partnerSituations[partnerId]?.length > 0
  );
  if (allPartnersHaveSituations && state.selectedPartners.length > 0) {
    progress = 0.875;
  }
  
  // Summary screen shows full progress
  if (state.part2Complete) progress = 1.0;
  
  return progress;
};

export const { 
  updateNativeLanguage, 
  updateIndustry, 
  updateJobTitle, 
  updateJobDescription, 
  updateSelectedRole, 
  updateCustomRole, 
  updateSelectedPartners,
  togglePartnerSelection,
  updateCurrentPartnerIndex,
  updatePartnerSituations,
  toggleSituationSelection,
  clearRoleMatches, 
  clearError, 
  resetOnboarding 
} = onboardingSlice.actions;
export default onboardingSlice.reducer;