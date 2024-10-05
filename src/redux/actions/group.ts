import { createAsyncThunk } from '@reduxjs/toolkit';

import { groupApi } from '../../api/admin';
import { deleteApi, getApi, postApi, updateApi } from '../../api/axios';
import { GetAllGroupParams } from '../interfaces/interfaces';

export const getGroups = createAsyncThunk(
  'group/getall',
  async ({ page, per_page, sort, include, name = '' }: GetAllGroupParams) => {
    const res = await getApi(groupApi, {
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

export const searchGroups = createAsyncThunk('group/search', async (name: string | null) => {
  const res = await getApi(groupApi, {
    filter: {
      name,
    },
  });
  return res;
});

export const updateGroup = createAsyncThunk('group/update', async ({ id, name }: { id?: string; name?: string }) => {
  const url = `${groupApi}/${id}`;
  const res = await updateApi(url, {
    name: name,
  });
  return res;
});

export const deleteGroup = createAsyncThunk('group/delete', async (id: string) => {
  const url = `${groupApi}/${id}`;
  const res = await deleteApi(url);
  return res;
});

export const createGroup = createAsyncThunk('group/create', async (name: string) => {
  const res = await postApi(groupApi, { name });
  return res;
});
