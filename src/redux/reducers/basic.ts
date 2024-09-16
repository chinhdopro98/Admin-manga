import { createSlice } from "@reduxjs/toolkit";
import type { BasicData } from "../interfaces/interfaces";
import { getBasic } from "../actions/basic";

const initialState: {
    data: BasicData; 
    error?: string | null;
    loading: boolean;
  } = {
    data: {} as BasicData, 
    error: null,
    loading: false,
  };
  
  const basicSlice = createSlice({
    name: "basic",
    initialState,
    reducers: {
    
    },
    extraReducers: (builder) => {
      builder
        .addCase(getBasic.pending, (state) => {
          state.loading = true;
        })
        .addCase(getBasic.fulfilled, (state, action) => {
          state.data = action.payload.data; 
          state.loading = false;
          state.error = null;
        })
        .addCase(getBasic.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        });
    },
  });
  
  export const { reducer: basicReducer } = basicSlice;
  export default basicSlice.reducer;