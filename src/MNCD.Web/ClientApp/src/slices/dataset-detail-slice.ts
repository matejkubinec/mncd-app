import axios from "../axios";
import { DataSetDetailViewModel, ApiResponse } from "../types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface State {
  id: number;
  isLoading: boolean;
  error: string;
  dataSet: DataSetDetailViewModel | null;
}

const initialState: State = {
  id: 0,
  isLoading: false,
  error: "",
  dataSet: null,
};

export const fetchDataSetDetailById = createAsyncThunk(
  "/api/dataset/:id",
  async (dataSetId: string) => {
    const url = `/api/dataset/${dataSetId}`;
    const response = await axios.get<ApiResponse<DataSetDetailViewModel>>(url);
    return response.data;
  }
);

const slice = createSlice({
  name: "dataset-detail",
  initialState,
  reducers: {
    downloadDataSetById: (_, action: PayloadAction<string | number>) => {
      const dataSetId = action.payload;
      const url = `/api/dataset/download/${dataSetId}`;
      window.open(url);
    },
  },
  extraReducers: {
    [fetchDataSetDetailById.pending.toString()]: (state) => {
      state.isLoading = true;
    },
    [fetchDataSetDetailById.fulfilled.toString()]: (
      state,
      action: PayloadAction<ApiResponse<DataSetDetailViewModel>>
    ) => {
      state.isLoading = false;
      state.dataSet = action.payload.data;
    },
    [fetchDataSetDetailById.rejected.toString()]: (
      state,
      action: PayloadAction<ApiResponse<DataSetDetailViewModel>>
    ) => {
      console.log(state);
      console.log(action);
    },
  },
});

export const { downloadDataSetById } = slice.actions;

export default slice.reducer;
