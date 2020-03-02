import axios from "axios";
import { SessionRowViewModel } from "../types";
import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type SessionListState = {
  isLoading: boolean;
  items: SessionRowViewModel[];
};

export type SessionAddEditDialog = {
  isOpen: boolean;
  isSaving: boolean;
  isEditing: boolean;
  id: number;
  name: string;
};

export type SessionState = {
  list: SessionListState;
  addEditDialog: SessionAddEditDialog;
};

const initialState = {
  list: {
    isLoading: false,
    items: []
  },
  addEditDialog: {
    isOpen: false,
    isSaving: false,
    isEditing: false,
    name: "",
    id: 0
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
    openAddEditDialog: (
      state,
      action: PayloadAction<SessionRowViewModel | undefined>
    ) => {
      state.addEditDialog.isOpen = true;
      state.addEditDialog.isEditing = false;
      state.addEditDialog.id = 0;
      state.addEditDialog.name = "";

      if (action.payload) {
        state.addEditDialog.id = action.payload.id || 0;
        state.addEditDialog.name = action.payload.name || "";
        state.addEditDialog.isEditing = true;
      }
    },
    updateAddEditDialogName: (state, action) => {
      state.addEditDialog.name = action.payload;
    },
    closeAddEditDialog: state => {
      state.addEditDialog.isOpen = false;
    },
    saveSessionStart: state => {
      state.addEditDialog.isSaving = true;
    },
    saveSessionSuccess: (state, action) => {
      state.addEditDialog.isSaving = false;
      state.addEditDialog.isOpen = false;
    }
  }
});

export const {
  fetchSessionsListStart,
  fetchSessionsListSuccess,
  openAddEditDialog,
  updateAddEditDialogName,
  closeAddEditDialog,
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
  const { name } = state.session.addEditDialog;
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

export const editSession = () => (
  dispatch: Dispatch,
  getState: () => RootState
) => {
  const state = getState();
  const { id, name } = state.session.addEditDialog;
  const data = { id, name };

  dispatch(saveSessionStart());

  axios
    .patch("api/session", data)
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
