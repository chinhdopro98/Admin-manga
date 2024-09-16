import { createAsyncThunk } from '@reduxjs/toolkit';

import { groupApi } from '../../api/admin';
import { getApi } from '../../api/axios';
import { GetAllGroupParams } from '../interfaces/interfaces';

export const getGroups = createAsyncThunk(
  'group/getall',
  async ({ page, per_page, sort, include }: GetAllGroupParams) => {
    const res = await getApi(groupApi, {
      page,
      per_page,
      sort,
      include,
    });
    return res;
  }
);

export const searchGroups = createAsyncThunk('group/search', async (name: string | null) => {
  const res = await getApi(groupApi, {
    filter: {
      name,
    },
  });
  return res;
});
