import { createBrowserHistory } from "history";
import { connectRouter, routerMiddleware } from "connected-react-router";
import {
  combineReducers,
  getDefaultMiddleware,
  configureStore
} from "@reduxjs/toolkit";
import dataSetReducer from "./slices/DataSetSlice";
import sessionReducer from "./slices/SessionSlice";
import analysisReducer from "./slices/AnalysisSlice";

export const history = createBrowserHistory();

const reducer = combineReducers({
  session: sessionReducer,
  dataset: dataSetReducer,
  analysis: analysisReducer,
  router: connectRouter(history)
});

const middleware = [...getDefaultMiddleware(), routerMiddleware(history)];

const store = configureStore({
  reducer,
  middleware
});

export type RootState = ReturnType<typeof reducer>;

export default store;
