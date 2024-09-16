import { createSlice } from '@reduxjs/toolkit';

import { AchievementState } from '../interfaces/interfaces';
import { getAchievements } from '../actions/achievement';

const initialState: AchievementState = {
  loading: false,
  achievements: [],
  pagination: {
    count: 0,
    currentPage: 0,
    links: null,
    perPage: 0,
    total: 0,
    totalPages: 0,
  },
  error: '',
};

const AchievementSlice = createSlice({
  name: 'achievement',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAchievements.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAchievements.fulfilled, (state, action) => {
        state.achievements = action.payload.data;
        state.pagination = action.payload.pagination;
        state.loading = false;
        state.error = null;
      })
      .addCase(getAchievements.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { reducer: achievementReducer } = AchievementSlice;
export default AchievementSlice.reducer;
