import { createAsyncThunk } from '@reduxjs/toolkit';

import { mangaApi } from '../../api/admin';
import { getApi } from '../../api/axios';
import { GetAllMangaParams, GetMangaSingle } from '../interfaces/interfaces';

export const getMangas = createAsyncThunk('manga/get-all', async ({ page, per_page, sort, include }: GetAllMangaParams) => {
  const res = await getApi(mangaApi, {
    page,
    per_page,
    sort,
    include,
  });
  return res;
});

export const getMangaSingle = createAsyncThunk('manga/get-one', async ({ include, id }: GetMangaSingle) => {
  const urlManga = `${mangaApi}/${id}`;
  const res = await getApi(urlManga, {
    include,
  });
  return res;
});
