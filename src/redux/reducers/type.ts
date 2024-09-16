import { createSlice } from '@reduxjs/toolkit';

import { getTypes, searchTypes } from '../actions/type';
import { TypeState } from '../interfaces/interfaces';

const initialState: TypeState = {
  loading: false,
  types: [],
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

const TypeMangaSlice = createSlice({
  name: 'type',
  initialState,
  reducers: {
    resetTypes: (state) => {
      state.types = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTypes.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTypes.fulfilled, (state, action) => {
        state.types = action.payload.data;
        state.pagination = action.payload.pagination;
        state.loading = false;
        state.error = null;
      })
      .addCase(getTypes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(searchTypes.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchTypes.fulfilled, (state, action) => {
        state.types = action.payload.data;
        state.pagination = action.payload.pagination;
        state.loading = false;
        state.error = null;
      })
      .addCase(searchTypes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export const { resetTypes } = TypeMangaSlice.actions;
export const { reducer: typeReducer } = TypeMangaSlice;
export default TypeMangaSlice.reducer;
