import { createAsyncThunk } from '@reduxjs/toolkit';

import { userApi } from '../../api/admin';
import { getApi } from '../../api/axios';
import { GetAllUserParams } from '../interfaces/interfaces';

export const getAllUser = createAsyncThunk('user/getAll', async ({ page, per_page, sort }: GetAllUserParams) => {
  const res = await getApi(userApi, {
    page,
    per_page,
    // filter: { role: 'member' },
    sort,
  });
  return res;
});

export const searchUsers = createAsyncThunk('user/search', async (name: string) => {
  const res = await getApi(userApi, {
    filter: {
      name,
    },
  });
  return res;
});
