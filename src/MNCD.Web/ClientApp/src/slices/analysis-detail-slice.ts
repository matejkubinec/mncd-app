import axios, { handleError } from "../axios";
import { ApiResponse, AnalysisViewModel, Response } from "../types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface State {
  id: number;
  isLoading: boolean;
  error: string;
  analysis: AnalysisViewModel | null;
  edit: {
    notes: string;
    isSaving: boolean;
    error: string;
  };
}

const initialState: State = {
  id: 0,
  isLoading: false,
  error: "",
  analysis: null,
  edit: {
    notes: "",
    isSaving: false,
    error: "",
  },
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

export const editAnalysisById = createAsyncThunk(
  "editAnalysisById",
  async (arg: { id: number; notes: string }, thunkAPI) => {
    try {
      const { id, notes } = arg;
      const url = `/api/analysis/${id}`;
      const res = await axios.patch<Response>(url, { notes });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(handleError(error));
    }
  }
);

const slice = createSlice({
  name: "analysis-detail",
  initialState,
  reducers: {
    downloadAnalysisById: (_, action: PayloadAction<string | number>) => {
      window.open(`/api/analysis/download/${action.payload}`);
    },
    dismissEditError: (state) => {
      state.edit.error = "";
    },
    editNotes: (state, action: PayloadAction<string>) => {
      state.edit.notes = action.payload;
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
      state.edit.notes = state.analysis.notes;
    },
    [fetchAnalysisDetailById.rejected.toString()]: (
      state,
      action: PayloadAction<ApiResponse<AnalysisViewModel>>
    ) => {
      state.error = action.payload.message;
      state.isLoading = false;
    },
    [editAnalysisById.pending.toString()]: (state) => {
      state.edit.isSaving = true;
    },
    [editAnalysisById.fulfilled.toString()]: (
      state,
      action: PayloadAction<Response>
    ) => {
      state.edit.isSaving = false;
    },
    [editAnalysisById.rejected.toString()]: (
      state,
      action: PayloadAction<Response>
    ) => {
      state.edit.isSaving = false;
      state.edit.error = action.payload.message;
    },
  },
});

export const {
  downloadAnalysisById,
  dismissEditError,
  editNotes,
} = slice.actions;

export default slice.reducer;
