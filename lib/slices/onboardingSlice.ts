import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { apiClient } from '../api';

export type NativeLanguage = 'english' | 'chinese_traditional' | 'chinese_simplified';
export type Industry = 'banking_finance' | 'shipping_logistics' | 'real_estate' | 'hotels_hospitality';

interface OnboardingState {
  // Part 1 data
  nativeLanguage: NativeLanguage | null;
  industry: Industry | null;
  
  // API states
  isLoading: boolean;
  error: string | null;
  
  // Progress tracking
  part1Complete: boolean;
  part2Complete: boolean;
  part3Complete: boolean;
}

const initialState: OnboardingState = {
  nativeLanguage: null,
  industry: null,
  isLoading: false,
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
      });
  },
});

export const { updateNativeLanguage, updateIndustry, clearError, resetOnboarding } = onboardingSlice.actions;
export default onboardingSlice.reducer;