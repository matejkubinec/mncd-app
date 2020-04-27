import axios from "../axios";
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
  async (analysisId: string) => {
    const url = `/api/analysis/${analysisId}`;
    const response = await axios.get<ApiResponse<AnalysisViewModel>>(url);
    return response.data;
  }
);

const slice = createSlice({
  name: "analysis-detail",
  initialState,
  reducers: {
    setVisualizationType: (state, action: PayloadAction<VisualizationType>) => {
      state.visualization = action.payload;
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
      const error = (action as any).error;

      if (error) {
        state.error = error.message;
      }
      console.log(state);
      console.log(action);
      state.isLoading = false;
    },
  },
});

export const { setVisualizationType } = slice.actions;

export default slice.reducer;
