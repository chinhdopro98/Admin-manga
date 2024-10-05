import { createSlice } from '@reduxjs/toolkit';

import { createType, deleteType, getTypes, searchTypes, updateType } from '../actions/type';
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
  showSuccess: false,
  showError: false,
};

const TypeMangaSlice = createSlice({
  name: 'type',
  initialState,
  reducers: {
    resetTypes: (state) => {
      state.types = [];
    },
    onCloseToastType(state) {
      state.showError = false;
      state.showSuccess = false;
    },
    deleteTypeItem(state, action) {
      state.types = state.types.filter((item) => item.id !== action.payload);
    },
    changeTypeItem(state, action) {
      const { id, name } = action.payload;
      state.types = state.types.map((item) => (item.id === id ? { ...item, name: name } : item));
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
      })

      .addCase(updateType.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateType.fulfilled, (state, action) => {
        state.loading = false;
        state.showSuccess = true;
      })
      .addCase(updateType.rejected, (state, action) => {
        state.loading = false;
        state.showError = true;
        state.error = action.error.message;
      })

      .addCase(deleteType.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteType.fulfilled, (state, action) => {
        state.loading = false;
        state.showSuccess = true;
      })
      .addCase(deleteType.rejected, (state, action) => {
        state.loading = false;
        state.showError = true;
        state.error = action.error.message;
      })

      .addCase(createType.pending, (state) => {
        state.loading = true;
      })
      .addCase(createType.fulfilled, (state, action) => {
        state.loading = false;
        state.showSuccess = true;
      })
      .addCase(createType.rejected, (state, action) => {
        state.showError = true;
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export const { resetTypes, onCloseToastType, deleteTypeItem, changeTypeItem } = TypeMangaSlice.actions;
export const { reducer: typeReducer } = TypeMangaSlice;
export default TypeMangaSlice.reducer;
