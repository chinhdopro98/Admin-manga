import { createAsyncThunk } from '@reduxjs/toolkit';

import { authorApi, typeApi } from '../../api/admin';
import { getApi } from '../../api/axios';
import { GetAllAuthorParams } from '../interfaces/interfaces';

export const getTypes = createAsyncThunk('type/get-all', async ({ page, per_page, sort, include }: GetAllAuthorParams) => {
  const res = await getApi(typeApi, {
    page,
    per_page,
    sort,
    include,
  });
  return res;
});



export const searchTypes = createAsyncThunk('type/search', async (name: string) => {
  const res = await getApi(typeApi, {
    filter: {
      name,
    },
  });
  return res;
});
