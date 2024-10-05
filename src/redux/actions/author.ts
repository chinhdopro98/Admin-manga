import { createAsyncThunk } from '@reduxjs/toolkit';

import { authorApi } from '../../api/admin';
import { deleteApi, getApi, postApi, updateApi } from '../../api/axios';
import { GetAllAuthorParams } from '../interfaces/interfaces';

export const getAuhtors = createAsyncThunk(
  'authors/get-all',
  async ({ page, per_page, sort, include, name = '' }: GetAllAuthorParams) => {
    const res = await getApi(authorApi, {
      page,
      per_page,
      sort,
      include,
      filter: {
        name,
      },
    });
    return res;
  }
);

export const searchAuthors = createAsyncThunk('authors/search', async (name: string | null) => {
  const res = await getApi(authorApi, {
    filter: {
      name,
    },
  });
  return res;
});

export const updateAuthor = createAsyncThunk('authors/update', async ({ id, name }: { id?: string; name?: string }) => {
  const url = `${authorApi}/${id}`;
  const res = await updateApi(url, {
    name: name,
  });
  return res;
});

export const deleteAuthor = createAsyncThunk('authors/delete', async (id: string) => {
  const url = `${authorApi}/${id}`;
  const res = await deleteApi(url);
  return res;
});

export const createAuthor = createAsyncThunk('authors/create', async (name: string) => {
  const res = await postApi(authorApi, { name });
  return res;
});
