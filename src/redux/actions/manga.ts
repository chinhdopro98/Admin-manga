import { createAsyncThunk } from '@reduxjs/toolkit';

import { chapterApi, mangaApi } from '../../api/admin';
import { getApi } from '../../api/axios';
import { GetAllChapterParams, GetAllMangaParams, GetMangaSingle } from '../interfaces/interfaces';

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
    include
  });
  return res;
});

export const getChapters = createAsyncThunk('chapter/get-all', async ({ per_page, id }: GetAllChapterParams) => {
  const res = await getApi(chapterApi, {
    per_page,
    filter: {
      manga_id: id
    }
  });
  return res;
});
