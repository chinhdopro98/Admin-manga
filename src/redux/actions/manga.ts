import { createAsyncThunk } from '@reduxjs/toolkit';

import { chapterApi, mangaApi } from '../../api/admin';
import { deleteApi, getApi, postApiFormData, updateApi } from '../../api/axios';
import { ChapterUpdatePayload, GetAllChapterParams, GetAllMangaParams, GetMangaSingle } from '../interfaces/interfaces';

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
  console.log(12312312);
  const url = `${chapterApi}/${id}`;
  await deleteApi(url);
});

export const deleteManyChapter = createAsyncThunk('chapter/delete-many', async (ids: string[]) => {
  const url = `${chapterApi}/delete-many`;
  const response = await updateApi(url, ids);
  return response?.data;
});
