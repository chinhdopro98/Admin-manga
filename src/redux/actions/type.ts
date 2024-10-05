import { createAsyncThunk } from '@reduxjs/toolkit';

import { authorApi, typeApi } from '../../api/admin';
import { deleteApi, getApi, postApi, updateApi } from '../../api/axios';
import { GetAllAuthorParams } from '../interfaces/interfaces';

export const getTypes = createAsyncThunk(
  'type/get-all',
  async ({ page, per_page, sort, include }: GetAllAuthorParams) => {
    const res = await getApi(typeApi, {
      page,
      per_page,
      sort,
      include,
    });
    return res;
  }
);

export const searchTypes = createAsyncThunk('type/search', async (name: string) => {
  const res = await getApi(typeApi, {
    filter: {
      name,
    },
  });
  return res;
});

export const updateType = createAsyncThunk('type/update', async ({ id, name }: { id?: string; name?: string }) => {
  const url = `${typeApi}/${id}`;
  const res = await updateApi(url, {
    name: name,
  });
  return res;
});

export const deleteType = createAsyncThunk('type/delete', async (id: string) => {
  const url = `${typeApi}/${id}`;
  const res = await deleteApi(url);
  return res;
});

export const createType = createAsyncThunk('type/create', async (name: string) => {
  const res = await postApi(typeApi, { name });
  return res;
});
