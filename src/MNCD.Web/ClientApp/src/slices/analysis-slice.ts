import axios from "../axios";
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
import { createSlice, PayloadAction, Dispatch } from "@reduxjs/toolkit";
import { RootState } from "../store";

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
  layout: "all" | "side-by-side";
  sideBySide: {
    index1: number;
    index2: number;
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
  layout: "all",
  sideBySide: {
    index1: 0,
    index2: 0,
  },
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
          break;
        case FlattenningAlgorithm.MergeFlattening:
          const layerIndices = dataSet
            ? new Array(dataSet.layerCount).fill(0).map((_, i) => i)
            : [];
          state.request.flatteningAlgorithmParameters = {
            includeWeights: "true",
            layerIndices: JSON.stringify(layerIndices),
          };
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
          break;
      }
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
          break;
        case AnalysisAlgorithm.FluidC:
          state.request.analysisAlgorithmParameters = {
            k: "2",
            maxIterations: "100",
          };
          break;
        case AnalysisAlgorithm.KClique:
          state.request.analysisAlgorithmParameters = {
            k: "2",
          };
          break;
        case AnalysisAlgorithm.CLECC:
          state.request.analysisAlgorithmParameters = {
            k: "2",
            alpha: "1",
          };
          break;
        case AnalysisAlgorithm.ABACUS:
          state.request.analysisAlgorithmParameters = {
            treshold: "2",
            algorithm: String(Number(AnalysisAlgorithm.Louvain)),
            parameters: "{}",
          };
          break;
      }
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
      state.isRequestValid = true;

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
    setLayout: (state, action: PayloadAction<"all" | "side-by-side">) => {
      state.layout = action.payload;
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
  },
});

export const {
  fetchAnalysisSessionStart,
  fetchAnalysisSessionSuccess,
  fetchAnalysisSessionError,
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

export const fetchAnalysisSession = (id: string) => (dispatch: Dispatch) => {
  dispatch(fetchAnalysisSessionStart());

  axios
    .get<ApiResponse<AnalysisSessionViewModel>>("/api/session/" + id)
    .then(({ data }) => {
      dispatch(fetchAnalysisSessionSuccess(data));
    })
    .catch(({ response, message }) => {
      if (response) {
        const { data, status } = response;

        if (status !== 500) {
          dispatch(fetchAnalysisSessionError(data));
        } else {
          dispatch(fetchAnalysisSessionError({ message }));
        }
      } else {
        dispatch(fetchAnalysisSessionError({ message }));
      }
    });
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
    .catch(({ response, message }) => {
      if (response) {
        const { data, status } = response;

        if (status !== 500) {
          dispatch(analysisError(data));
        } else {
          dispatch(analysisError({ message }));
        }
      } else {
        dispatch(analysisError({ message }));
      }
    });
};

export const toggleVisibility = (id: number) => (dispatch: Dispatch) => {
  dispatch(toggleVisibilityStart(id));
  axios.post(`api/analysis/${id}/toggle-visibility`);
};

export default slice.reducer;
