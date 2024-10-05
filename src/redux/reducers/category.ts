import { createSlice } from '@reduxjs/toolkit';

import {
  changeShowOnMB,
  changeShowOnPC,
  createCategory,
  deleteCategory,
  getCategories,
  selectAllCategories,
} from '../actions/category';
import { CategoryState } from '../interfaces/interfaces';

const initialState: CategoryState = {
  loading: false,
  categories: [],
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

const CategorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    onCloseToastCategory(state) {
      state.showError = false;
      state.showSuccess = false;
    },
    deleteCategoryItem(state, action) {
      state.categories = state.categories.filter((item) => item.id !== action.payload);
    },
    changeStateShowPC(state, action) {
      const { id, value } = action.payload;
      state.categories = state.categories.map((item) =>
        item.id === id ? { ...item, show_on_pc: value ? 1 : 0 } : item
      );
    },
    changeStateShowMB(state, action) {
      const { id, value } = action.payload;
      state.categories = state.categories.map((item) =>
        item.id === id ? { ...item, show_on_mb: value ? 1 : 0 } : item
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categories = action.payload.data;
        state.pagination = action.payload.pagination;
        state.loading = false;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(selectAllCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(selectAllCategories.fulfilled, (state, action) => {
        state.categories = action.payload.data;
        state.loading = false;
      })
      .addCase(selectAllCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(changeShowOnPC.pending, (state) => {
        state.loading = true;
      })
      .addCase(changeShowOnPC.fulfilled, (state, action) => {
        state.loading = false;
        state.showSuccess = true;
      })
      .addCase(changeShowOnPC.rejected, (state, action) => {
        state.loading = false;
        state.showError = true;
        state.error = action.error.message;
      })

      .addCase(changeShowOnMB.pending, (state) => {
        state.loading = true;
      })
      .addCase(changeShowOnMB.fulfilled, (state, action) => {
        state.loading = false;
        state.showSuccess = true;
      })
      .addCase(changeShowOnMB.rejected, (state, action) => {
        state.loading = false;
        state.showError = true;
        state.error = action.error.message;
      })

      .addCase(deleteCategory.pending, (state) => {})
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.showSuccess = true;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.showError = true;
        state.error = action.error.message;
      })

      .addCase(createCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.showSuccess = true;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.showError = true;
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export const { onCloseToastCategory, deleteCategoryItem, changeStateShowMB, changeStateShowPC } = CategorySlice.actions;
export const { reducer: categoryReducer } = CategorySlice;
export default CategorySlice.reducer;
