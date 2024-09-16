import { createAsyncThunk } from '@reduxjs/toolkit';

import { mangaApi } from '../../api/admin';
import { getApi } from '../../api/axios';
import { GetAllMangaParams } from '../interfaces/interfaces';

export const getMangas = createAsyncThunk(
  'manga',
  async ({ page, per_page, sort, include }: GetAllMangaParams) => {
    const res = await getApi(mangaApi, {
      page,
      per_page,
      sort,
      include,
    });
    return res;
  }
);
