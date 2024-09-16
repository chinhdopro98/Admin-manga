import { createAsyncThunk } from '@reduxjs/toolkit';

import { authorApi } from '../../api/admin';
import { getApi } from '../../api/axios';
import { GetAllAuthorParams } from '../interfaces/interfaces';

export const getAuhtors = createAsyncThunk('authors/get-all', async ({ page, per_page, sort, include }: GetAllAuthorParams) => {
  const res = await getApi(authorApi, {
    page,
    per_page,
    sort,
    include,
  });
  return res;
});



export const searchAuthors = createAsyncThunk('authors/search', async (name: string | null) => {
  const res = await getApi(authorApi, {
    filter: {
      name,
    },
  });
  return res;
});
