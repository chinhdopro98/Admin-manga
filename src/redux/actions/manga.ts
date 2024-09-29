import { createAsyncThunk } from '@reduxjs/toolkit';

import { chapterApi, mangaApi } from '../../api/admin';
import { getApi, postApiFormData, updateApi } from '../../api/axios';
import {
  ChapterUpdatePayload,
  GetAllChapterParams,
  GetAllMangaParams,
  GetMangaSingle,
  IMangaPayloadUpdate,
} from '../interfaces/interfaces';

export const getMangas = createAsyncThunk(
  'manga/get-all',
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

export const getMangaSingle = createAsyncThunk('manga/get-one', async ({ include, id }: GetMangaSingle) => {
  const urlManga = `${mangaApi}/${id}`;
  const res = await getApi(urlManga, {
    include,
  });
  return res;
});

export const getChapters = createAsyncThunk('chapter/get-all', async ({ per_page, id }: GetAllChapterParams) => {
  const res = await getApi(chapterApi, {
    per_page,
    filter: {
      manga_id: id,
    },
  });
  return res;
});

export const getChapterdetail = createAsyncThunk('chapter/get-one', async (id: string) => {
  const urlChapDetail = `${chapterApi}/${id}`;
  const res = await getApi(urlChapDetail);
  return res;
});

export const updateChapter = createAsyncThunk(
  'chapter/update',
  async ({ id, name, contents }: ChapterUpdatePayload) => {
    try {
      const data = new FormData();
      data.append('name', name);
      contents.forEach((content) => {
        data.append('image_urls[]', content.url);
      });

      const apiUpdateUrl = `${chapterApi}/${id}?_method=put`;
      const response = await postApiFormData(apiUpdateUrl, data);
      return response.data;
    } catch (error) {
      console.error('Failed to update chapter:', error);
    }
  }
);

export const updateManga = createAsyncThunk('manga/update', async ({ id, data }: any) => {
  const genres = data?.genres?.map((item: any) => item.id);
  console.log(genres, data.genres,44444444444);
  data.genres = genres;
  const urlUpdateManga = `${mangaApi}/${id}`;
  const response = await updateApi(urlUpdateManga, data);
  return response.data;
});
