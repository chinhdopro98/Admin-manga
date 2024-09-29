import { createSlice } from '@reduxjs/toolkit';

import { getChapterdetail, getChapters, getMangas, getMangaSingle, updateChapter, updateManga } from '../actions/manga';
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
  showSuccess: false,
  showError: false,
};
const MangaSlice = createSlice({
  name: 'manga',
  initialState,
  reducers: {
    changePanelPosition(state, action) {
      const { sourceIndex, destinationIndex } = action.payload;
      if (state.chapter?.content) {
        const removed = state.chapter.content.splice(sourceIndex, 1);
        if (removed.length > 0) {
          const itemToMove = removed[0];
          state.chapter.content.splice(destinationIndex, 0, itemToMove);
        }
      }
    },
    deletePannel(state, action) {
      const index = action.payload;
      state?.chapter?.content?.splice(index, 1);
    },
    onCloseToastManga(state) {
      state.showError = false;
      state.showSuccess = false;
    },
  },
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
        state.chapter = {
          ...action.payload.data,
          content: action.payload.data.content.map((item: string, index: number) => ({
            url: item,
            name: `Page ${index + 1}`,
          })),
        };
        state.loading = false;
      })
      .addCase(getChapterdetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(updateChapter.pending, (state) => {})
      .addCase(updateChapter.fulfilled, (state, action) => {
        state.chapter = action.payload;
        state.chapter = {
          ...action.payload,
          content: action.payload.content.map((item: string, index: number) => ({
            url: item,
            name: `Page ${index + 1}`,
          })),
        };
        state.showSuccess = true;
      })
      .addCase(updateChapter.rejected, (state, action) => {
        state.error = action.error.message;
        state.showError = true;
      })

      .addCase(updateManga.pending, (state) => {})
      .addCase(updateManga.fulfilled, (state, action) => {
        state.showSuccess = true;
      })
      .addCase(updateManga.rejected, (state, action) => {
        state.error = action.error.message;
        state.showError = true;
      });
  },
});

export const { changePanelPosition, deletePannel, onCloseToastManga } = MangaSlice.actions;
export const { reducer: mangaReducer } = MangaSlice;
export default MangaSlice.reducer;
