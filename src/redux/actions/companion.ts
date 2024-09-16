import { createAsyncThunk } from '@reduxjs/toolkit';

import { companionApi } from '../../api/admin';
import { getApi } from '../../api/axios';
import { GetAllCompanionParams } from '../interfaces/interfaces';

export const getCompanions = createAsyncThunk(
  'companion',
  async ({ page, per_page, sort, include }: GetAllCompanionParams) => {
    const res = await getApi(companionApi, {
      page,
      per_page,
      sort,
      include,
    });
    return res;
  }
);
