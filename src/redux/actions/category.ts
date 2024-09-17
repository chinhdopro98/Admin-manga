import { createAsyncThunk } from '@reduxjs/toolkit';

import { categoryApi } from '../../api/admin';
import { getApi } from '../../api/axios';
import { GetAllCategoryParams } from '../interfaces/interfaces';

export const getCategories = createAsyncThunk('genres/get-page', async ({ page, per_page, sort }: GetAllCategoryParams) => {
  const res = await getApi(categoryApi, {
    page,
    per_page,
    sort,
  });
  return res;
});

export const selectAllCategories = createAsyncThunk('genres/get-all', async () => {
  const res = await getApi(categoryApi, {
    per_page: 99999,
  });
  return res;
});
