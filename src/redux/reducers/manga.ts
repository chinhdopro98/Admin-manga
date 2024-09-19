import { createSlice } from '@reduxjs/toolkit';

import { getChapterdetail, getChapters, getMangas, getMangaSingle } from '../actions/manga';
import { MangaState } from '../interfaces/interfaces';

const initialState: MangaState = {
  loading: false,
  mangas: [],
  manga: null,
  chapters: [],
  chapter: null,
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
      })
      .addCase(getMangas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(getMangaSingle.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMangaSingle.fulfilled, (state, action) => {
        state.manga = action.payload.data;
        state.loading = false;
      })
      .addCase(getMangaSingle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(getChapters.pending, (state) => {
        state.loading = true;
      })
      .addCase(getChapters.fulfilled, (state, action) => {
        state.chapters = action.payload.data;
        state.loading = false;
      })
      .addCase(getChapters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(getChapterdetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(getChapterdetail.fulfilled, (state, action) => {
        state.chapter = action.payload.data;
        state.loading = false;
      })
      .addCase(getChapterdetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { reducer: mangaReducer } = MangaSlice;
export default MangaSlice.reducer;
