import { createAsyncThunk } from '@reduxjs/toolkit';

import { categoryApi } from '../../api/admin';
import { deleteApi, getApi, postApi, updateApi } from '../../api/axios';
import { GetAllCategoryParams } from '../interfaces/interfaces';

export const getCategories = createAsyncThunk(
  'genres/get-page',
  async ({ page, per_page, sort, name }: GetAllCategoryParams) => {
    const res = await getApi(categoryApi, {
      page,
      per_page,
      sort,
      filter: {
        name,
      },
    });
    return res;
  }
);

export const selectAllCategories = createAsyncThunk('genres/get-all', async () => {
  const res = await getApi(categoryApi, {
    per_page: 99999,
  });
  return res;
});

export const changeShowOnPC = createAsyncThunk(
  'genres/change-pc',
  async ({ id, show_on_pc }: { id?: number; show_on_pc?: boolean }) => {
    const url = `${categoryApi}/${id}`;
    const res = await updateApi(url, {
      show_on_pc,
    });
    return res;
  }
);

export const changeShowOnMB = createAsyncThunk(
  'genres/change-mb',
  async ({ id, show_on_mb }: { id?: number; show_on_mb?: boolean }) => {
    const url = `${categoryApi}/${id}`;
    const res = await updateApi(url, {
      show_on_mb,
    });
    return res;
  }
);

export const deleteCategory = createAsyncThunk('genres/delete', async (id: number) => {
  const url = `${categoryApi}/${id}`;
  const res = await deleteApi(url);
  return res;
});

export const createCategory = createAsyncThunk('genres/create', async (name: string) => {
  const res = await postApi(categoryApi, { name });
  return res;
});
