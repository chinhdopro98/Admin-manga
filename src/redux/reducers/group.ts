import { createSlice } from '@reduxjs/toolkit';

import { getGroups, searchGroups } from '../actions/group';
import { GroupState } from '../interfaces/interfaces';

const initialState: GroupState = {
  loading: false,
  groups: [],
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

const GroupSlice = createSlice({
  name: 'group',
  initialState,
  reducers: {
    resetGroups: (state) => {
      state.groups = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGroups.pending, (state) => {
        state.loading = true;
      })
      .addCase(getGroups.fulfilled, (state, action) => {
        state.groups = action.payload.data;
        state.pagination = action.payload.pagination;
        state.loading = false;
        state.error = null;
      })
      .addCase(getGroups.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(searchGroups.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchGroups.fulfilled, (state, action) => {
        state.groups = action.payload.data;
        state.pagination = action.payload.pagination;
        state.loading = false;
        state.error = null;
      })
      .addCase(searchGroups.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export const { resetGroups } = GroupSlice.actions;
export const { reducer: groupReducer } = GroupSlice;
export default GroupSlice.reducer;
