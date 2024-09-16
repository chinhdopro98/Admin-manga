import { createAsyncThunk } from "@reduxjs/toolkit";
import { getApi } from '../../api/axios';
import { basicApi } from '../../api/admin';
// export const getBasic = createAsyncThunk(
//     'basic/getBasic', 
//     async () => {
//       const res = await getApi(basicApi); 
//       return res.data;
//     }
// );