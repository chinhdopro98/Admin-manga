import { createAsyncThunk } from '@reduxjs/toolkit';

import { achievementApi } from '../../api/admin';
import { getApi } from '../../api/axios';
import { GetAllAchievementParams, GetAllGroupParams } from '../interfaces/interfaces';

export const getAchievements = createAsyncThunk('achievement', async ({ page, per_page, sort, include }: GetAllAchievementParams) => {
  const res = await getApi(achievementApi, {
    page,
    per_page,
    sort,
    include,
  });
  return res;
});
