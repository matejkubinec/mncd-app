import axios from "axios";
import { SessionRowViewModel } from "../types";
import { createSlice, Dispatch } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { saveDataSetStart, saveDataSetSuccess } from "./DataSetSlice";

export type SessionListState = {
  isLoading: boolean;
  items: SessionRowViewModel[];
};

export type SessionAddModal = {
  isOpen: boolean;
  isSaving: boolean;
  name: string;
};

export type SessionState = {
  list: SessionListState;
  addModal: SessionAddModal;
};

const initialState = {
  list: {
    isLoading: false,
    items: []
  },
  addModal: {
    isOpen: false,
    isSaving: false,
    name: ""
  }
} as SessionState;

const slice = createSlice({
  name: "session-slice",
  initialState: initialState,
  reducers: {
    fetchSessionsListStart: state => {
      state.list.isLoading = true;
    },
    fetchSessionsListSuccess: (state, action) => {
      state.list.isLoading = false;
      state.list.items = action.payload;
    },
    openAddModal: state => {
      state.addModal.isOpen = true;
    },
    updateAddModalName: (state, action) => {
      state.addModal.name = action.payload;
    },
    closeAddModal: state => {
      state.addModal.isOpen = false;
    },
    saveSessionStart: state => {
      state.addModal.isSaving = true;
    },
    saveSessionSuccess: (state, action) => {
      state.addModal.isSaving = false;
      state.addModal.isOpen = false;
    }
  }
});

export const {
  fetchSessionsListStart,
  fetchSessionsListSuccess,
  openAddModal,
  updateAddModalName,
  closeAddModal,
  saveSessionStart,
  saveSessionSuccess
} = slice.actions;

export const fetchSessionsList = () => (dispatch: Dispatch) => {
  dispatch(fetchSessionsListStart());

  axios
    .get("api/session")
    .then(response => {
      const data = response.data;
      dispatch(fetchSessionsListSuccess(data));
    })
    .catch(reason => {
      // TODO: handle error
      console.log(reason);
    });
};

export const saveSession = () => (
  dispatch: Dispatch,
  getState: () => RootState
) => {
  const state = getState();
  const { name } = state.session.addModal;
  const data = { name };

  dispatch(saveSessionStart());

  axios
    .post("api/session", data)
    .then(response => {
      const data = response.data;
      dispatch(saveSessionSuccess(data));
      dispatch(fetchSessionsList() as any);
    })
    .catch(reason => {
      // TODO: handle error
      console.log(reason);
    });
};
export default slice.reducer;
