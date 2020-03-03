import axios from "axios";
import { SessionRowViewModel } from "../types";
import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type SessionListState = {
  isLoading: boolean;
  items: SessionRowViewModel[];
};

export type SessionRemoveDialogState = {
  isOpen: boolean;
  isRemoving: boolean;
  session: SessionRowViewModel;
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
  removeDialog: SessionRemoveDialogState;
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
  },
  removeDialog: {
    isOpen: false,
    isRemoving: false,
    session: {}
  } as SessionRemoveDialogState
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
    openRemoveDialog: (state, action: PayloadAction<SessionRowViewModel>) => {
      state.removeDialog.isOpen = true;
      state.removeDialog.isRemoving = false;
      state.removeDialog.session = action.payload;
    },
    removeSessionStart: state => {
      state.removeDialog.isRemoving = true;
    },
    removeSessionSuccess: state => {
      state.removeDialog.isRemoving = false;
      state.removeDialog.isOpen = false;
    },
    closeRemoveDialog: state => {
      state.removeDialog.isOpen = false;
      state.removeDialog.isRemoving = false;
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
  // Remove Dialog
  openRemoveDialog,
  closeRemoveDialog,
  removeSessionStart,
  removeSessionSuccess,

  // Sessions List
  fetchSessionsListStart,
  fetchSessionsListSuccess,

  // Add/Edit Dialog
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

export const removeSession = () => (
  dispatch: Dispatch,
  getState: () => RootState
) => {
  const state = getState();
  const { id } = state.session.removeDialog.session;

  dispatch(removeSessionStart());

  axios
    .delete("api/session/" + id)
    .then(response => {
      if (response.status === 200) {
        dispatch(removeSessionSuccess());
        dispatch(fetchSessionsList() as any);
      }
    })
    .catch(reason => {
      // TODO: handle error
      console.log(reason);
    });
};

export default slice.reducer;
