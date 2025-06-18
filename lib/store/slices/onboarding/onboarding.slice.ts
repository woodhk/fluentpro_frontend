import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { 
  RoleMatch, 
  CommunicationPartnerAPI
} from '@/types/api/onboarding.types';
import {
  setNativeLanguage,
  setIndustry,
  searchRoles,
  selectRole,
  fetchCommunicationPartners,
  selectCommunicationPartners,
  selectCommunicationSituations,
  NativeLanguage,
  Industry
} from './onboarding.thunks';

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