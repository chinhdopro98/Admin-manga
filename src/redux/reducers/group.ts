import { createSlice } from '@reduxjs/toolkit';

import { createGroup, deleteGroup, getGroups, searchGroups, updateGroup } from '../actions/group';
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
  showSuccess: false,
  showError: false,
};

const GroupSlice = createSlice({
  name: 'group',
  initialState,
  reducers: {
    resetGroups: (state) => {
      state.groups = [];
    },
    onCloseToastGroup(state) {
      state.showError = false;
      state.showSuccess = false;
    },
    deleteGroupItem(state, action) {
      state.groups = state.groups.filter((item) => item.id !== action.payload);
    },
    changeGroupItem(state, action) {
      const { id, name } = action.payload;
      state.groups = state.groups.map((item) => (item.id === id ? { ...item, name: name } : item));
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
      })

      .addCase(updateGroup.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateGroup.fulfilled, (state, action) => {
        state.loading = false;
        state.showSuccess = true;
      })
      .addCase(updateGroup.rejected, (state, action) => {
        state.loading = false;
        state.showError = true;
        state.error = action.error.message;
      })

      .addCase(deleteGroup.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteGroup.fulfilled, (state, action) => {
        state.loading = false;
        state.showSuccess = true;
      })
      .addCase(deleteGroup.rejected, (state, action) => {
        state.loading = false;
        state.showError = true;
        state.error = action.error.message;
      })

      .addCase(createGroup.pending, (state) => {
        state.loading = true;
      })
      .addCase(createGroup.fulfilled, (state, action) => {
        state.loading = false;
        state.showSuccess = true;
      })
      .addCase(createGroup.rejected, (state, action) => {
        state.showError = true;
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export const { resetGroups, onCloseToastGroup, deleteGroupItem, changeGroupItem } = GroupSlice.actions;
export const { reducer: groupReducer } = GroupSlice;
export default GroupSlice.reducer;
