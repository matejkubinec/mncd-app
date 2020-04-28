import { createBrowserHistory } from "history";
import {
  combineReducers,
  getDefaultMiddleware,
  configureStore,
} from "@reduxjs/toolkit";
import {
  AnalysisReducer,
  AnalysisDetailReducer,
  DataSetReducer,
  DataSetDetailReducer,
  SessionReducer,
  ThemeReducer,
} from "./slices";

export const history = createBrowserHistory();

const reducer = combineReducers({
  session: SessionReducer,
  dataset: DataSetReducer,
  datasetDetail: DataSetDetailReducer,
  analysis: AnalysisReducer,
  analysisDetail: AnalysisDetailReducer,
  theme: ThemeReducer,
});

const middleware = getDefaultMiddleware();

const store = configureStore({
  reducer,
  middleware,
});

export type RootState = ReturnType<typeof reducer>;

export default store;
