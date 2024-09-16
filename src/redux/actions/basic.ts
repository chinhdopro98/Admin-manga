import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from '../../api/axios';
import { basicApi } from '../../api/admin';


export const getBasic = createAsyncThunk(
    'basic/getBasic', 
    async () => {
      const res = await apiClient.get(basicApi); 
      return res.data;
    }
);