import axios from "../axios";
import {
  AnalysisRequestViewModel,
  AnalysisApproach,
  AnalysisAlgorithm,
  FlattenningAlgorithm,
  DataSetRowViewModel
} from "../types";
import { createSlice, PayloadAction, Dispatch } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type AnalysisState = {
  request: AnalysisRequestViewModel;
  dataSetName: string;
  isDataSetModalOpen: boolean;
  isAnalyzing: boolean;
};

const initialState: AnalysisState = {
  request: {
    id: 0,
    datasetId: 0,
    selectedLayer: 0,
    approach: AnalysisApproach.SingleLayerFlattening,
    analysisAlgorithm: AnalysisAlgorithm.Louvain,
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
  updateAnalysisRequest,
  updateAnalysisDataSet,
  openDataSetModal,
  analysisStart,
  analysisSuccess
} = slice.actions;

export const analyzeDataSet = () => (
  dispatch: Dispatch,
  getState: () => RootState
) => {
  const state = getState();
  const request = state.analysis.request;

  dispatch(analysisStart());

  axios
    .post("/api/dataset", request)
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
