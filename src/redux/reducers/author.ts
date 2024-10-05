import { createSlice } from '@reduxjs/toolkit';

import { createAuthor, deleteAuthor, getAuhtors, searchAuthors, updateAuthor } from '../actions/author';
import { AuthorState } from '../interfaces/interfaces';

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
  showSuccess: false,
  showError: false,
};

const AuthorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    resetAuthors: (state) => {
      state.authors = [];
    },
    onCloseToastAuthor(state) {
      state.showError = false;
      state.showSuccess = false;
    },
    deleteAuthorItem(state, action) {
      state.authors = state.authors.filter((item) => item.id !== action.payload);
    },
    changeAuthorItem(state, action) {
      const { id, name } = action.payload;
      state.authors = state.authors.map((item) => (item.id === id ? { ...item, name: name } : item));
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
      })

      .addCase(updateAuthor.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateAuthor.fulfilled, (state, action) => {
        state.loading = false;
        state.showSuccess = true;
      })
      .addCase(updateAuthor.rejected, (state, action) => {
        state.loading = false;
        state.showError = true;
        state.error = action.error.message;
      })

      .addCase(deleteAuthor.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteAuthor.fulfilled, (state, action) => {
        state.loading = false;
        state.showSuccess = true;
      })
      .addCase(deleteAuthor.rejected, (state, action) => {
        state.loading = false;
        state.showError = true;
        state.error = action.error.message;
      })

      .addCase(createAuthor.pending, (state) => {
        state.loading = true;
      })
      .addCase(createAuthor.fulfilled, (state, action) => {
        state.loading = false;
        state.showSuccess = true;
      })
      .addCase(createAuthor.rejected, (state, action) => {
        state.showError = true;
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export const { resetAuthors, onCloseToastAuthor, deleteAuthorItem, changeAuthorItem } = AuthorSlice.actions;
export const { reducer: authorReducer } = AuthorSlice;
export default AuthorSlice.reducer;
