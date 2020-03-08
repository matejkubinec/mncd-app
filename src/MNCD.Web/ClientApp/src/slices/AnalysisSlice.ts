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
  visualizing: { [id: number]: boolean };
  request: AnalysisRequestViewModel;
  session: AnalysisSessionViewModel | null;
  dataSet: DataSetRowViewModel | null;
};

const initialState: AnalysisState = {
  isSessionLoading: false,
  isRequestValid: false,
  isAnalyzing: false,
  areControlsVisible: true,
  visualizing: {},
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
      state.request.flatteningAlgorithm = action.payload;

      // Set default parameters
      switch (action.payload) {
        case FlattenningAlgorithm.BasicFlattening:
          state.request.flatteningAlgorithmParameters = {};
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
        case AnalysisAlgorithm.FluidC:
          state.request.analysisAlgorithmParameters = {
            k: "2",
            maxIterations: "100"
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
    addVisualizationStart: (
      state,
      action: PayloadAction<AnalysisViewModel>
    ) => {
      state.visualizing[action.payload.id] = true;
    },
    addVisualizationSuccess: (
      state,
      action: PayloadAction<AnalysisViewModel>
    ) => {
      state.visualizing[action.payload.id] = false;
      if (state.session) {
        const i = state.session.analyses.findIndex(a => a.id == action.payload.id);
        state.session.analyses[i] = action.payload;
      }
      console.log(action.payload);
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
  addVisualizationStart,
  addVisualizationSuccess
} = slice.actions;

export const fetchAnalysisSession = (guid: string) => (dispatch: Dispatch) => {
  dispatch(fetchAnalysisSessionStart());

  axios.get("/api/analysis/" + guid).then(response => {
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

export const addVisualizations = (analysis: AnalysisViewModel) => (
  dispatch: Dispatch
) => {
  dispatch(addVisualizationStart(analysis));

  axios
    .post<AnalysisViewModel>(`/api/analysis/visualize/${analysis.id}`)
    .then(response => {
      const data = response.data;
      console.log(data);
      if (response.status == 200) {
        dispatch(addVisualizationSuccess(data));
      } else {
      }
    })
    .catch(reason => {
      // TODO: react handle error
      console.log(reason);
    });
};

export default slice.reducer;
