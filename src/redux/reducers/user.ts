import { createSlice } from '@reduxjs/toolkit';

import { getAllUser, searchUsers } from '../actions/user';
import { UsersState } from '../interfaces/interfaces';

const initialState: UsersState = {
  loading: false,
  users: [],
  pagination: {
    count: 0,
    currentPage: 1,
    links: null,
    perPage: 10,
    total: 0,
    totalPages: 1,
  },
  error: '',
};

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUsers: (state) => {
      state.users = [];
    },
  },
  extraReducers: (builder) => {
    builder
       //get
      .addCase(getAllUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllUser.fulfilled, (state, action) => {
        state.users = action.payload.data;
        state.pagination = action.payload.pagination;
        state.loading = false;
        state.error = null;
      })
      .addCase(getAllUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //search
      .addCase(searchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchUsers.fulfilled, (state, action) => {
        state.users = action.payload.data;
        state.pagination = action.payload.pagination;
        state.loading = false;
        state.error = null;
      })
      .addCase(searchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export const { resetUsers } = UserSlice.actions;
export const { reducer: userReducer } = UserSlice;
export default UserSlice.reducer;
