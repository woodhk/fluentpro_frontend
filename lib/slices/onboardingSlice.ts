import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { apiClient } from '../api';

export type NativeLanguage = 'english' | 'chinese_traditional' | 'chinese_simplified';

interface OnboardingState {
  // Part 1 data
  nativeLanguage: NativeLanguage | null;
  
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

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    // Local state updates (for optimistic updates)
    updateNativeLanguage: (state, action: PayloadAction<NativeLanguage>) => {
      state.nativeLanguage = action.payload;
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
      .addCase(setNativeLanguage.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(setNativeLanguage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.nativeLanguage = action.payload.language;
        state.part1Complete = true;
        state.error = null;
      })
      .addCase(setNativeLanguage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { updateNativeLanguage, clearError, resetOnboarding } = onboardingSlice.actions;
export default onboardingSlice.reducer;