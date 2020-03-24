import axios from "../axios";
import {
  AnalysisRequestViewModel,
  AnalysisApproach,
  AnalysisAlgorithm,
  FlattenningAlgorithm,
  DataSetRowViewModel,
  AnalysisSessionViewModel,
  AnalysisViewModel
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
    dataSetId: 0,
    selectedLayer: 0,
    approach: AnalysisApproach.SingleLayerFlattening,
    analysisAlgorithm: AnalysisAlgorithm.Louvain,
    analysisAlgorithmParameters: {},
    flatteningAlgorithm: FlattenningAlgorithm.BasicFlattening,
    flatteningAlgorithmParameters: {
      weightEdges: "true"
    }
  },
  dataSet: null
};

const slice = createSlice({
  name: "analysis-state",
  initialState: initialState,
  reducers: {
    fetchAnalysisSessionStart: state => {
      state.isSessionLoading = true;
    },
    fetchAnalysisSessionSuccess: (state, action) => {
      state.isSessionLoading = false;
      state.request.sessionId = action.payload.id;
      state.session = action.payload;
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
            weightEdges: "false"
          };
          break;
        case FlattenningAlgorithm.LocalSimplification:
          const relevances = dataSet
            ? new Array(dataSet.layerCount).fill(1.0)
            : [];
          state.request.flatteningAlgorithmParameters = {
            treshold: "1.0",
            weightEdges: "true",
            relevances: JSON.stringify(relevances)
          };
          break;
        case FlattenningAlgorithm.MergeFlattening:
          const layerIndices = dataSet
            ? new Array(dataSet.layerCount).fill(0).map((_, i) => i)
            : [];
          state.request.flatteningAlgorithmParameters = {
            includeWeights: "true",
            layerIndices: JSON.stringify(layerIndices)
          };
          break;
        case FlattenningAlgorithm.WeightedFlattening:
          if (!dataSet) {
            state.request.flatteningAlgorithmParameters = {
              weights: JSON.stringify([])
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
              weights: JSON.stringify(weights)
            };
          }
          break;
      }
    },
    updateFlatteningParameters: (state, action) => {
      state.request.flatteningAlgorithmParameters = {
        ...state.request.flatteningAlgorithmParameters,
        ...action.payload
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
            maxIterations: "100"
          };
          break;
        case AnalysisAlgorithm.KClique:
          state.request.analysisAlgorithmParameters = {
            k: "2"
          };
          break;
        case AnalysisAlgorithm.CLECC:
          state.request.analysisAlgorithmParameters = {
            k: "2",
            alpha: "1"
          };
          break;
      }
    },
    updateAnalysisParameters: (state, action: PayloadAction<object>) => {
      state.request.analysisAlgorithmParameters = {
        ...state.request.analysisAlgorithmParameters,
        ...action.payload
      };
    },
    updateAnalysisDataSet: (
      state,
      action: PayloadAction<DataSetRowViewModel>
    ) => {
      state.dataSet = action.payload;
      state.request.dataSetId = action.payload.id;
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
              relevances: JSON.stringify(relevances)
            };
            break;
          case FlattenningAlgorithm.MergeFlattening:
            const layerIndices = dataSet
              ? new Array(dataSet.layerCount).fill(0).map((_, i) => i)
              : [];
            state.request.flatteningAlgorithmParameters = {
              ...state.request.flatteningAlgorithmParameters,
              layerIndices: JSON.stringify(layerIndices)
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
              weights: JSON.stringify(weights)
            };
            break;
        }
      }
    },
    toggleResultControls: state => {
      state.areResultControlsVisible = !state.areResultControlsVisible;
    },
    toggleControlsVisiblity: state => {
      state.areControlsVisible = !state.areControlsVisible;
    },
    analysisStart: state => {
      state.isAnalyzing = true;
    },
    analysisSuccess: (state, action: PayloadAction<AnalysisViewModel>) => {
      state.isAnalyzing = false;
      if (state.session) {
        state.session.analyses.push(action.payload);
      }
    },
    toggleVisibilityStart: (state, action: PayloadAction<number>) => {
      const id = action.payload;

      if (state.session) {
        const analysis = state.session.analyses.find(a => a.id === id);

        if (analysis) {
          analysis.isOpen = !analysis.isOpen;
        }
      }
    }
  }
});

export const {
  fetchAnalysisSessionStart,
  fetchAnalysisSessionSuccess,
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
  toggleControlsVisiblity,
  toggleVisibilityStart,
  toggleResultControls
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

export const fetchAnalysisSession = (guid: string) => (dispatch: Dispatch) => {
  dispatch(fetchAnalysisSessionStart());

  axios
    .get<AnalysisSessionViewModel>("/api/analysis/" + guid)
    .then(response => {
      if (response.status === 200) {
        dispatch(fetchAnalysisSessionSuccess(response.data));
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
    .post("/api/analysis", request)
    .then(response => {
      const data = response.data;
      if (response.status == 200) {
        dispatch(analysisSuccess(data));
      } else {
      }
    })
    .catch(reason => {
      // TODO: react handle error
    });
};

export const toggleVisibility = (id: number) => (dispatch: Dispatch) => {
  dispatch(toggleVisibilityStart(id));
  axios.post(`api/analysis/${id}/toggle-visibility`);
};

export default slice.reducer;
