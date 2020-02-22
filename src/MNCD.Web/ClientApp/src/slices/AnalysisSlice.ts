import axios from "../axios";
import {
  DataSetRowViewModel,
  DataSetAddViewModel,
  AnalysisRequestViewModel,
  AnalysisApproach,
  AnalysisAlgorithm,
  FlattenningAlgorithm
} from "../types";
import { createSlice, Dispatch } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type AnalysisState = {
  request: AnalysisRequestViewModel;
  dataSetName: string;
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
  dataSetName: ""
};

const slice = createSlice({
  name: "analysis-state",
  initialState: initialState,
  reducers: {}
});

export const {} = slice.actions;

export default slice.reducer;
