import { createSlice } from '@reduxjs/toolkit';

import { CompanionState } from '../interfaces/interfaces';
import { getCompanions } from '../actions/companion';

const initialState: CompanionState = {
  loading: false,
  companions: [],
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

const CompanionSlice = createSlice({
  name: 'companion',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCompanions.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCompanions.fulfilled, (state, action) => {
        state.companions = action.payload.data;
        state.pagination = action.payload.pagination;
        state.loading = false;
        state.error = null;
      })
      .addCase(getCompanions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { reducer: companionReducer } = CompanionSlice;
export default CompanionSlice.reducer;
