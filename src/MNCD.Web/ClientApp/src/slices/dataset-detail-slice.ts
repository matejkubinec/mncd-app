import axios from "../axios";
import { DataSetDetailViewModel, ApiResponse } from "../types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface State {
  id: number;
  isLoading: boolean;
  error: string;
  dataSet: DataSetDetailViewModel | null;
  layout: "diagonal" | "slices";
}

const initialState: State = {
  id: 0,
  isLoading: false,
  error: "",
  dataSet: null,
  layout: "diagonal",
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
  reducers: {},
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

export const {} = slice.actions;

export default slice.reducer;
