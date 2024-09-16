import { createSlice } from '@reduxjs/toolkit';

import { MangaState } from '../interfaces/interfaces';
import { getMangas } from '../actions/manga';

const initialState: MangaState = {
  loading: false,
  mangas: [],
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

const MangaSlice = createSlice({
  name: 'manga',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMangas.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMangas.fulfilled, (state, action) => {
        state.mangas = action.payload.data;
        state.pagination = action.payload.pagination;
        state.loading = false;
        state.error = null;
      })
      .addCase(getMangas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { reducer: mangaReducer } = MangaSlice;
export default MangaSlice.reducer;
