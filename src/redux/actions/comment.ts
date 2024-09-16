import { createAsyncThunk } from '@reduxjs/toolkit';

import { commentApi } from '../../api/admin';
import { getApi } from '../../api/axios';
import { GetAllCommentParams } from '../interfaces/interfaces';

export const getComments = createAsyncThunk('comment', async ({ page, per_page, sort, include }: GetAllCommentParams) => {
  const res = await getApi(commentApi, {
    page,
    per_page,
    sort,
    include
  });
  return res;
});
