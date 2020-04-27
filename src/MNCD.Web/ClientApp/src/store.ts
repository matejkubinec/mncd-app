import { createBrowserHistory } from "history";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { reducer as notifications } from "react-notification-system-redux";
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
  notifications,
  router: connectRouter(history),
});

const middleware = [...getDefaultMiddleware(), routerMiddleware(history)];

const store = configureStore({
  reducer,
  middleware,
});

export type RootState = ReturnType<typeof reducer>;

export default store;
