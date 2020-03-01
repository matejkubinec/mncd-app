import axios from "../axios";
import {
  AnalysisRequestViewModel,
  AnalysisApproach,
  SessionRowViewModel,
  AnalysisAlgorithm,
  FlattenningAlgorithm,
  DataSetRowViewModel
} from "../types";
import { createSlice, PayloadAction, Dispatch } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type AnalysisState = {
  isSessionLoading: boolean;
  request: AnalysisRequestViewModel;
  session: SessionRowViewModel | null;
  dataSetName: string;
  isDataSetModalOpen: boolean;
  isAnalyzing: boolean;
};

const initialState: AnalysisState = {
  isSessionLoading: false,
  session: null,
  request: {
    id: 0,
    sessionId: 0,
    datasetId: 0,
    selectedLayer: 0,
    approach: AnalysisApproach.SingleLayerFlattening,
    analysisAlgorithm: AnalysisAlgorithm.FluidC,
    analysisAlgorithmParameters: {},
    flatteningAlgorithm: FlattenningAlgorithm.BasicFlattening,
    flatteningAlgorithmParameters: {}
  },
  dataSetName: "",
  isDataSetModalOpen: false,
  isAnalyzing: true
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
    updateAnalysisDataSet: (
      state,
      action: PayloadAction<DataSetRowViewModel>
    ) => {
      state.dataSetName = action.payload.name;
      state.request.datasetId = action.payload.id;
      state.isDataSetModalOpen = false;
    },
    openDataSetModal: state => {
      state.isDataSetModalOpen = true;
    },
    analysisStart: state => {
      state.isAnalyzing = true;
    },
    analysisSuccess: (state, action) => {
      state.isAnalyzing = false;
    }
  }
});

export const {
  fetchAnalysisSessionStart,
  fetchAnalysisSessionSuccess,
  updateAnalysisRequest,
  updateAnalysisDataSet,
  openDataSetModal,
  analysisStart,
  analysisSuccess
} = slice.actions;

export const fetchAnalysisSession = (guid: string) => (
  dispatch: Dispatch,
  getState: () => RootState
) => {
  const state = getState();
  const sessions = state.session.list.items;
  const session = sessions.find(s => s.guid === guid);

  if (session) {
    dispatch(fetchAnalysisSessionSuccess(session));
  }

  console.log(session);
}

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
      console.log(data);
      if (response.status == 200) {
        dispatch(analysisSuccess({}));
      } else {
      }
    })
    .catch(reason => {
      // TODO: react handle error
      console.log(reason);
    });
};

export default slice.reducer;
