import { createAsyncThunk } from '@reduxjs/toolkit';

import { chapterApi, mangaApi } from '../../api/admin';
import { deleteApi, getApi, postApiFormData, updateApi } from '../../api/axios';
import { ChapterUpdatePayload, GetAllChapterParams, GetAllMangaParams, GetMangaSingle } from '../interfaces/interfaces';

const buildQueryParams = (params: GetAllMangaParams) => {
  const query = new URLSearchParams();

  if (params.page) query.append('page', params.page.toString());
  if (params.per_page) query.append('per_page', params.per_page.toString());
  if (params.sort) query.append('sort', params.sort);
  if (params.include) query.append('include', params.include);

  if (params.data) {
    Object.keys(params.data).forEach((key) => {
      const value = params.data?.[key as keyof typeof params.data];
      if (value) query.append(`filter[${key}]`, value);
    });
  }

  return query.toString();
};

export const getMangas = createAsyncThunk('manga/get-all', async (params: GetAllMangaParams) => {
  const queryParams = buildQueryParams(params);
  const res = await getApi(`${mangaApi}?${queryParams}`);
  return res;
});

export const getMangaSingle = createAsyncThunk('manga/get-one', async ({ include, id }: GetMangaSingle) => {
  const url = `${mangaApi}/${id}`;
  const res = await getApi(url, {
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
  const url = `${chapterApi}/${id}`;
  const res = await getApi(url);
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

      const url = `${chapterApi}/${id}?_method=put`;
      const response = await postApiFormData(url, data);
      return response.data;
    } catch (error) {
      console.error('Failed to update chapter:', error);
    }
  }
);

export const updateManga = createAsyncThunk('manga/update', async ({ id, data }: any) => {
  const genres = data?.genres?.map((item: any) => item.id);
  data.genres = genres;
  const url = `${mangaApi}/${id}`;
  const response = await updateApi(url, data);
  return response.data;
});

export const deleteSingleChapter = createAsyncThunk('chapter/delete-one', async (id: string) => {
  const url = `${chapterApi}/${id}`;
  await deleteApi(url);
});

export const deleteManyChapter = createAsyncThunk('chapter/delete-many', async (ids: string[]) => {
  const url = `${chapterApi}/delete-many`;
  const response = await updateApi(url, ids);
  return response?.data;
});

export const deleteManga = createAsyncThunk('manga/delete-one', async (id: string) => {
  const url = `${mangaApi}/${id}`;
  await deleteApi(url);
});
