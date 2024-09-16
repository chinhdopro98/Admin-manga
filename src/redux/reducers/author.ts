import { createSlice } from '@reduxjs/toolkit';

import { AuthorState,  } from '../interfaces/interfaces';
import { getAuhtors, searchAuthors } from '../actions/author';

const initialState: AuthorState = {
  loading: false,
  authors: [],
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

const AuthorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    resetAuthors: (state) => {
      state.authors = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAuhtors.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAuhtors.fulfilled, (state, action) => {
        state.authors = action.payload.data;
        state.pagination = action.payload.pagination;
        state.loading = false;
        state.error = null;
      })
      .addCase(getAuhtors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(searchAuthors.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchAuthors.fulfilled, (state, action) => {
        state.authors = action.payload.data;
        state.pagination = action.payload.pagination;
        state.loading = false;
        state.error = null;
      })
      .addCase(searchAuthors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export const { resetAuthors } = AuthorSlice.actions;
export const { reducer: authorReducer } = AuthorSlice;
export default AuthorSlice.reducer;
