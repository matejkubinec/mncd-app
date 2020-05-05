import axios, { handleError } from "../axios";
import {
  AnalysisRequestViewModel,
  AnalysisApproach,
  AnalysisAlgorithm,
  FlattenningAlgorithm,
  DataSetRowViewModel,
  AnalysisSessionViewModel,
  AnalysisViewModel,
  ApiResponse,
  Response,
} from "../types";
import {
  createSlice,
  PayloadAction,
  Dispatch,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { RootState } from "../store";

export enum AnalysesLayout {
  All,
  SideBySide,
}

export type AnalysisState = {
  isSessionLoading: boolean;
  isAnalyzing: boolean;
  isRequestValid: boolean;
  areControlsVisible: boolean;
  areResultControlsVisible: boolean;
  request: AnalysisRequestViewModel;
  session: AnalysisSessionViewModel | null;
  dataSet: DataSetRowViewModel | null;
  success: string | null;
  error: string | null;
  layout: AnalysesLayout;
  sideBySide: {
    index1: number;
    index2: number;
  };
  deleteDialog: {
    isOpen: boolean;
    isDeleting: boolean;
    id: number;
    error: string;
  };
  requestErrors: {
    hasDataSet: boolean;
    hasFlatteningError: boolean;
    hasAlgorithmError: boolean;
  };
};

const initialState: AnalysisState = {
  isSessionLoading: false,
  isRequestValid: false,
  isAnalyzing: false,
  areControlsVisible: true,
  areResultControlsVisible: true,
  session: null,
  request: {
    id: 0,
    sessionId: 0,
    datasetId: 0,
    selectedLayer: 0,
    approach: AnalysisApproach.SingleLayerFlattening,
    analysisAlgorithm: AnalysisAlgorithm.Louvain,
    analysisAlgorithmParameters: {},
    flatteningAlgorithm: FlattenningAlgorithm.BasicFlattening,
    flatteningAlgorithmParameters: {
      weightEdges: "true",
    },
  },
  dataSet: null,
  success: null,
  error: null,
  layout: AnalysesLayout.All,
  sideBySide: {
    index1: 0,
    index2: 0,
  },
  deleteDialog: {
    isOpen: false,
    isDeleting: false,
    id: 0,
    error: "",
  },
  requestErrors: {
    hasDataSet: false,
    hasFlatteningError: false,
    hasAlgorithmError: false,
  },
};

export const fetchSessionById = createAsyncThunk(
  "/api/session/:id",
  async (id: number | string, thunkAPI) => {
    try {
      const url = `/api/session/${id}`;
      const res = await axios.get<ApiResponse<AnalysisSessionViewModel>>(url);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(handleError(error));
    }
  }
);

export const toggleVisibility = createAsyncThunk(
  "api/analysis/toggle-visibility/:id",
  async (id: number, thunkAPI) => {
    thunkAPI.dispatch(toggleVisibilityStart(id));
    const url = `api/analysis/${id}/toggle-visibility`;
    await axios.post(url);
  }
);

export const deleteAnalysisById = createAsyncThunk(
  "deleteAnalysis",
  async (id: number | string, thunkAPI) => {
    try {
      const url = `/api/analysis/${id}`;
      const res = await axios.delete<number>(url);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(handleError(error));
    }
  }
);

const isRequestValid = (state: AnalysisState) => {
  const {
    hasDataSet,
    hasFlatteningError,
    hasAlgorithmError,
  } = state.requestErrors;

  if (state.request.approach === AnalysisApproach.SingleLayerFlattening) {
    return hasDataSet && !hasFlatteningError && !hasAlgorithmError;
  }

  return hasDataSet && !hasAlgorithmError;
};

const slice = createSlice({
  name: "analysis-state",
  initialState: initialState,
  reducers: {
    fetchAnalysisSessionStart: (state) => {
      state.isSessionLoading = true;
    },
    fetchAnalysisSessionSuccess: (
      state,
      action: PayloadAction<ApiResponse<AnalysisSessionViewModel>>
    ) => {
      const { data } = action.payload;
      state.isSessionLoading = false;
      state.request.sessionId = data.id;
      state.session = data;
      state.error = null;
    },
    fetchAnalysisSessionError: (state, action: PayloadAction<Response>) => {
      state.session = null;
      state.error = action.payload.message;
    },
    setApproach: (state, action: PayloadAction<AnalysisApproach>) => {
      state.request.approach = action.payload;
    },
    updateSelectedLayer: (state, action: PayloadAction<number>) => {
      state.request.selectedLayer = action.payload;
    },
    updateAnalysisRequest: (state, action) => {
      if (state.request === action.payload["approach"]) {
        return;
      }

      if (action.payload["flatteningAlgorithm"]) {
        state.request.flatteningAlgorithmParameters = {};
      }

      if (action.payload["analysisAlgorithm"]) {
        state.request.analysisAlgorithmParameters = {};
      }

      state.request = { ...state.request, ...action.payload };
      state.isRequestValid = isRequestValid(state);
    },
    setFlatteningAlgorithm: (
      state,
      action: PayloadAction<FlattenningAlgorithm>
    ) => {
      const { dataSet } = state;
      state.request.flatteningAlgorithm = action.payload;

      // Set default parameters
      switch (action.payload) {
        case FlattenningAlgorithm.BasicFlattening:
          state.request.flatteningAlgorithmParameters = {
            weightEdges: "false",
          };
          state.requestErrors.hasFlatteningError = false;
          break;
        case FlattenningAlgorithm.LocalSimplification:
          const relevances = dataSet
            ? new Array(dataSet.layerCount).fill(1.0)
            : [];
          state.request.flatteningAlgorithmParameters = {
            treshold: "1.0",
            weightEdges: "true",
            relevances: JSON.stringify(relevances),
          };
          state.requestErrors.hasFlatteningError = false;
          break;
        case FlattenningAlgorithm.MergeFlattening:
          const layerIndices = dataSet
            ? new Array(dataSet.layerCount).fill(0).map((_, i) => i)
            : [];
          state.request.flatteningAlgorithmParameters = {
            includeWeights: "true",
            layerIndices: JSON.stringify(layerIndices),
          };
          state.requestErrors.hasFlatteningError = false;
          break;
        case FlattenningAlgorithm.WeightedFlattening:
          if (!dataSet) {
            state.request.flatteningAlgorithmParameters = {
              weights: JSON.stringify([]),
            };
          } else {
            const weights: number[][] = [];
            for (let i = 0; i < dataSet.layerCount; i++) {
              weights.push([]);
              for (let j = 0; j < dataSet.layerCount; j++) {
                weights[i].push(1.0);
              }
            }
            state.request.flatteningAlgorithmParameters = {
              weights: JSON.stringify(weights),
            };
          }
          state.requestErrors.hasFlatteningError = false;
          break;
      }

      state.isRequestValid = isRequestValid(state);
    },
    updateFlatteningParameters: (state, action) => {
      state.request.flatteningAlgorithmParameters = {
        ...state.request.flatteningAlgorithmParameters,
        ...action.payload,
      };
    },
    setAnalysisAlgorithm: (state, action: PayloadAction<AnalysisAlgorithm>) => {
      state.request.analysisAlgorithm = action.payload;

      // Set default parameters
      switch (action.payload) {
        case AnalysisAlgorithm.Louvain:
          state.request.analysisAlgorithmParameters = {};
          state.requestErrors.hasAlgorithmError = false;
          break;
        case AnalysisAlgorithm.FluidC:
          state.request.analysisAlgorithmParameters = {
            k: "2",
            maxIterations: "100",
          };
          state.requestErrors.hasAlgorithmError = false;
          break;
        case AnalysisAlgorithm.KClique:
          state.request.analysisAlgorithmParameters = {
            k: "2",
          };
          state.requestErrors.hasAlgorithmError = false;
          break;
        case AnalysisAlgorithm.CLECC:
          state.request.analysisAlgorithmParameters = {
            k: "2",
            alpha: "1",
          };
          state.requestErrors.hasAlgorithmError = false;
          break;
        case AnalysisAlgorithm.ABACUS:
          state.request.analysisAlgorithmParameters = {
            treshold: "2",
            algorithm: String(Number(AnalysisAlgorithm.Louvain)),
            parameters: "{}",
          };
          state.requestErrors.hasAlgorithmError = false;
        case AnalysisAlgorithm.LabelPropagation:
          state.request.analysisAlgorithmParameters = {
            maxIterations: "10000",
          };
          state.requestErrors.hasAlgorithmError = false;
          break;
      }

      state.isRequestValid = isRequestValid(state);
    },
    updateAnalysisParameters: (state, action: PayloadAction<object>) => {
      state.request.analysisAlgorithmParameters = {
        ...state.request.analysisAlgorithmParameters,
        ...action.payload,
      };
    },
    updateAnalysisDataSet: (
      state,
      action: PayloadAction<DataSetRowViewModel>
    ) => {
      state.dataSet = action.payload;
      state.request.datasetId = action.payload.id;
      state.requestErrors.hasDataSet = true;

      if (state.request.approach === AnalysisApproach.SingleLayerFlattening) {
        const { flatteningAlgorithm } = state.request;
        const { dataSet } = state;

        switch (flatteningAlgorithm) {
          case FlattenningAlgorithm.LocalSimplification:
            const relevances = dataSet
              ? new Array(dataSet.layerCount).fill(1.0)
              : [];
            state.request.flatteningAlgorithmParameters = {
              ...state.request.flatteningAlgorithmParameters,
              relevances: JSON.stringify(relevances),
            };
            break;
          case FlattenningAlgorithm.MergeFlattening:
            const layerIndices = dataSet
              ? new Array(dataSet.layerCount).fill(0).map((_, i) => i)
              : [];
            state.request.flatteningAlgorithmParameters = {
              ...state.request.flatteningAlgorithmParameters,
              layerIndices: JSON.stringify(layerIndices),
            };
            break;
          case FlattenningAlgorithm.WeightedFlattening:
            const weights: number[][] = [];
            for (let i = 0; i < dataSet.layerCount; i++) {
              weights.push([]);
              for (let j = 0; j < dataSet.layerCount; j++) {
                weights[i].push(1.0);
              }
            }
            state.request.flatteningAlgorithmParameters = {
              weights: JSON.stringify(weights),
            };
            break;
        }
      }

      state.isRequestValid = isRequestValid(state);
    },
    toggleResultControls: (state) => {
      state.areResultControlsVisible = !state.areResultControlsVisible;
    },
    toggleControlsVisiblity: (state) => {
      state.areControlsVisible = !state.areControlsVisible;
    },
    analysisStart: (state) => {
      state.isAnalyzing = true;
    },
    analysisSuccess: (
      state,
      action: PayloadAction<ApiResponse<AnalysisViewModel>>
    ) => {
      state.isAnalyzing = false;
      if (state.session) {
        state.session.analyses.push(action.payload.data);
      }
    },
    analysisError: (state, action: PayloadAction<Response>) => {
      state.isAnalyzing = false;
      state.error = action.payload.message;
    },
    toggleVisibilityStart: (state, action: PayloadAction<number>) => {
      const id = action.payload;

      if (state.session) {
        const analysis = state.session.analyses.find((a) => a.id === id);

        if (analysis) {
          analysis.isOpen = !analysis.isOpen;
        }
      }
    },
    setLeftSide: (state, action: PayloadAction<number>) => {
      state.sideBySide.index1 = action.payload;
    },
    setRightSide: (state, action: PayloadAction<number>) => {
      state.sideBySide.index2 = action.payload;
    },
    setLayout: (state, action: PayloadAction<AnalysesLayout>) => {
      state.layout = action.payload;
    },
    openDeleteDialog: (state, action: PayloadAction<number>) => {
      state.deleteDialog.id = action.payload;
      state.deleteDialog.isOpen = true;
      state.deleteDialog.error = "";
    },
    closeDeleteDialog: (state) => {
      state.deleteDialog.id = 0;
      state.deleteDialog.isOpen = false;
      state.deleteDialog.error = "";
    },
    dismissDeleteDialogError: (state) => {
      state.deleteDialog.error = "";
    },
    showSuccessMessage: (state, action: PayloadAction<string>) => {
      state.success = action.payload;
    },
    hideSuccessMessage: (state) => {
      state.success = null;
    },
    showErrorMessage: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    hideErrorMessage: (state) => {
      state.error = null;
    },
    setHasFlatteningError: (state, action: PayloadAction<boolean>) => {
      state.requestErrors.hasFlatteningError = action.payload;
      state.isRequestValid = isRequestValid(state);
    },
    setHasAnalysisError: (state, action: PayloadAction<boolean>) => {
      state.requestErrors.hasAlgorithmError = action.payload;
      state.isRequestValid = isRequestValid(state);
    },
  },
  extraReducers: {
    [fetchSessionById.pending.toString()]: (state) => {
      state.isSessionLoading = true;
    },
    [fetchSessionById.fulfilled.toString()]: (
      state,
      action: PayloadAction<ApiResponse<AnalysisSessionViewModel>>
    ) => {
      state.isSessionLoading = false;
      state.request.sessionId = action.payload.data.id;
      state.session = action.payload.data;
      state.error = null;
    },
    [fetchSessionById.rejected.toString()]: (
      state,
      action: PayloadAction<ApiResponse<AnalysisSessionViewModel>>
    ) => {
      state.isSessionLoading = false;
      state.session = null;
      state.error = action.payload.message;
    },
    [deleteAnalysisById.pending.toString()]: (state) => {
      state.deleteDialog.isDeleting = true;
    },
    [deleteAnalysisById.fulfilled.toString()]: (
      state,
      action: PayloadAction<ApiResponse<number>>
    ) => {
      state.deleteDialog.isDeleting = false;
      state.deleteDialog.isOpen = false;

      if (state.session) {
        state.session.analyses = state.session.analyses.filter(
          (a) => a.id !== action.payload.data
        );
      }
    },
    [deleteAnalysisById.rejected.toString()]: (
      state,
      action: PayloadAction<Response>
    ) => {
      state.deleteDialog.isDeleting = false;
      state.deleteDialog.error = action.payload.message;
    },
  },
});

export const {
  setApproach,
  setFlatteningAlgorithm,
  updateFlatteningParameters,
  setAnalysisAlgorithm,
  updateAnalysisRequest,
  updateAnalysisParameters,
  updateAnalysisDataSet,
  updateSelectedLayer,
  analysisStart,
  analysisSuccess,
  analysisError,
  toggleControlsVisiblity,
  toggleVisibilityStart,
  toggleResultControls,
  showSuccessMessage,
  hideSuccessMessage,
  showErrorMessage,
  hideErrorMessage,
  setLeftSide,
  setRightSide,
  setLayout,
  openDeleteDialog,
  closeDeleteDialog,
  dismissDeleteDialogError,
  setHasFlatteningError,
  setHasAnalysisError,
} = slice.actions;

export const setAnalysisApproach = (approach: AnalysisApproach) => (
  dispatch: Dispatch,
  getState: () => RootState
) => {
  const state = getState();
  const previousApproach = state.analysis.request.approach;

  dispatch(setApproach(approach));
  if (approach !== previousApproach) {
    switch (approach) {
      case AnalysisApproach.MultiLayer:
        dispatch(setAnalysisAlgorithm(AnalysisAlgorithm.CLECC));
        break;
      case AnalysisApproach.SingleLayerFlattening:
      case AnalysisApproach.SingleLayerOnly:
        dispatch(setAnalysisAlgorithm(AnalysisAlgorithm.Louvain));
        break;
    }
  }
};

export const analyzeDataSet = () => (
  dispatch: Dispatch,
  getState: () => RootState
) => {
  const state = getState();
  const request = state.analysis.request;

  dispatch(analysisStart());

  axios
    .post<ApiResponse<AnalysisViewModel>>("/api/analysis", request)
    .then(({ data }) => {
      dispatch(analysisSuccess(data));
    })
    .catch((error) => {
      dispatch(analysisError(handleError(error)));
    });
};

export default slice.reducer;
