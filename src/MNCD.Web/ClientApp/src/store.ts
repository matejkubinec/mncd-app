import { createBrowserHistory } from "history";
import { connectRouter, routerMiddleware } from "connected-react-router";
import {
  combineReducers,
  getDefaultMiddleware,
  configureStore
} from "@reduxjs/toolkit";
import dataSetReducer from "./slices/DataSetSlice";

export const history = createBrowserHistory();

const reducer = combineReducers({
  dataset: dataSetReducer,
  router: connectRouter(history)
});

const middleware = [...getDefaultMiddleware(), routerMiddleware(history)];

const store = configureStore({
  reducer,
  middleware
});

export type RootState = ReturnType<typeof reducer>;

export default store;
