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
  request: AnalysisRequestViewModel;
  session: AnalysisSessionViewModel | null;
  dataSet: DataSetRowViewModel | null;
};

const initialState: AnalysisState = {
  isSessionLoading: false,
  isRequestValid: false,
  isAnalyzing: false,
  areControlsVisible: true,
  session: null,
  request: {
    id: 0,
    sessionId: 0,
    datasetId: 0,
    selectedLayer: 0,
    approach: AnalysisApproach.SingleLayerFlattening,
    analysisAlgorithm: AnalysisAlgorithm.FluidC,
    analysisAlgorithmParameters: {
      k: "2",
      maxIterations: "100"
    },
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
    setAnalysisApproach: (state, action: PayloadAction<AnalysisApproach>) => {
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
          console.log(layerIndices);
          state.request.flatteningAlgorithmParameters = {
            includeWeights: "true",
            layerIndices: JSON.stringify(layerIndices)
          };
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
          state.request.analysisAlgorithmParameters = {}
        case AnalysisAlgorithm.FluidC:
          state.request.analysisAlgorithmParameters = {
            k: "2",
            maxIterations: "100"
          };
        case AnalysisAlgorithm.KClique:
          state.request.analysisAlgorithmParameters = {
            k: "2"
          };
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
              relevances: JSON.stringify(relevances)
            };
            break;
          case FlattenningAlgorithm.MergeFlattening:
            const layerIndices = dataSet
              ? new Array(dataSet.layerCount).fill(0).map((_, i) => i)
              : [];
            console.log(layerIndices);
            state.request.flatteningAlgorithmParameters = {
              ...state.request.flatteningAlgorithmParameters,
              layerIndices: JSON.stringify(layerIndices)
            };
            break;
        }
      }
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
  setAnalysisApproach,
  setFlatteningAlgorithm,
  updateFlatteningParameters,
  setAnalysisAlgorithm,
  updateAnalysisRequest,
  updateAnalysisParameters,
  updateAnalysisDataSet,
  updateSelectedLayer,
  toggleControlsVisiblity,
  analysisStart,
  analysisSuccess,
  toggleVisibilityStart
} = slice.actions;

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
      console.log(reason);
    });
};

export const toggleVisibility = (id: number) => (dispatch: Dispatch) => {
  dispatch(toggleVisibilityStart(id));
  axios
    .post(`api/analysis/${id}/toggle-visibility`)
    .then(response => {
      if (response.status !== 200) {
        // TODO: handle error
        console.log(response);
      }
    })
    .catch(reason => {
      // TODO: handle error
      console.log(reason);
    });
};

export default slice.reducer;
