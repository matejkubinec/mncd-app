import axios, { handleError } from "../axios";
import { ApiResponse, AnalysisViewModel } from "../types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum VisualizationType {
  MultiLayer,
  MultiLayerCommunities,
  SingleLayer,
  SingleLayerCommunities,
}

interface State {
  id: number;
  isLoading: boolean;
  error: string;
  analysis: AnalysisViewModel | null;
  visualization: VisualizationType;
}

const initialState: State = {
  id: 0,
  isLoading: false,
  error: "",
  analysis: null,
  visualization: VisualizationType.MultiLayer,
};

export const fetchAnalysisDetailById = createAsyncThunk(
  "/api/analysis/:id",
  async (analysisId: string, thunkAPI) => {
    const url = `/api/analysis/${analysisId}`;

    try {
      const response = await axios.get<ApiResponse<AnalysisViewModel>>(url);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(handleError(error));
    }
  }
);

const slice = createSlice({
  name: "analysis-detail",
  initialState,
  reducers: {
    setVisualizationType: (state, action: PayloadAction<VisualizationType>) => {
      state.visualization = action.payload;
    },
    downloadAnalysisById: (_, action: PayloadAction<string | number>) => {
      window.open(`/api/analysis/download/${action.payload}`);
    },
  },
  extraReducers: {
    [fetchAnalysisDetailById.pending.toString()]: (state) => {
      state.isLoading = true;
    },
    [fetchAnalysisDetailById.fulfilled.toString()]: (
      state,
      action: PayloadAction<ApiResponse<AnalysisViewModel>>
    ) => {
      state.isLoading = false;
      state.analysis = action.payload.data;
    },
    [fetchAnalysisDetailById.rejected.toString()]: (
      state,
      action: PayloadAction<ApiResponse<AnalysisViewModel>>
    ) => {
      state.error = action.payload.message;
      state.isLoading = false;
    },
  },
});

export const { setVisualizationType, downloadAnalysisById } = slice.actions;

export default slice.reducer;
