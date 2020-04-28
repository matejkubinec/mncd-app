import axios from "axios";
import { SessionRowViewModel, ApiResponse, Response } from "../types";
import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type SessionListState = {
  isLoading: boolean;
  success: string | null;
  error: string | null;
  items: SessionRowViewModel[];
};

export type SessionRemoveDialogState = {
  isOpen: boolean;
  isRemoving: boolean;
  session: SessionRowViewModel;
  error: string | null;
};

export type SessionAddEditDialog = {
  isOpen: boolean;
  isSaving: boolean;
  isEditing: boolean;
  id: number;
  name: string;
  error: string | null;
};

export type SessionState = {
  list: SessionListState;
  addEditDialog: SessionAddEditDialog;
  removeDialog: SessionRemoveDialogState;
};

const initialState = {
  list: {
    isLoading: false,
    success: null,
    error: null,
    items: [],
  } as SessionListState,
  addEditDialog: {
    isOpen: false,
    isSaving: false,
    isEditing: false,
    id: 0,
    name: "",
    error: null,
  },
  removeDialog: {
    isOpen: false,
    isRemoving: false,
    session: {},
    error: null,
  } as SessionRemoveDialogState,
} as SessionState;

const slice = createSlice({
  name: "session-slice",
  initialState: initialState,
  reducers: {
    fetchSessionsListStart: (state) => {
      state.list.isLoading = true;
    },
    fetchSessionsListSuccess: (
      state,
      action: PayloadAction<ApiResponse<SessionRowViewModel[]>>
    ) => {
      state.list.isLoading = false;
      state.list.items = action.payload.data;
    },
    fetchSessionsListError: (state, action: PayloadAction<Response>) => {
      state.list.isLoading = false;
      state.list.error = action.payload.message;
    },
    dismissSesionsListSuccessMessage: (state) => {
      state.list.success = null;
    },
    dismissSesionsListErrorMessage: (state) => {
      state.list.error = null;
    },
    openRemoveDialog: (state, action: PayloadAction<SessionRowViewModel>) => {
      state.removeDialog.isOpen = true;
      state.removeDialog.isRemoving = false;
      state.removeDialog.session = action.payload;
    },
    removeSessionStart: (state) => {
      state.removeDialog.isRemoving = true;
      state.list.error = null;
      state.list.success = null;
    },
    removeSessionSuccess: (
      state,
      action: PayloadAction<ApiResponse<number>>
    ) => {
      const { data, message } = action.payload;
      state.removeDialog.isRemoving = false;
      state.removeDialog.isOpen = false;
      state.list.items = state.list.items.filter((i) => i.id !== data);
      state.list.success = message;
    },
    removeSessionError: (state, action: PayloadAction<Response>) => {
      state.removeDialog.isRemoving = false;
      state.removeDialog.error = action.payload.message;
    },
    clearRemoveDialogError: (state) => {
      state.removeDialog.error = null;
    },
    closeRemoveDialog: (state) => {
      state.removeDialog.isOpen = false;
      state.removeDialog.isRemoving = false;
    },
    openAddEditDialog: (
      state,
      action: PayloadAction<SessionRowViewModel | undefined>
    ) => {
      state.addEditDialog.isOpen = true;
      state.addEditDialog.isEditing = false;
      state.addEditDialog.error = null;
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
    clearAddEditEdialogError: (state) => {
      state.addEditDialog.error = null;
    },
    closeAddEditDialog: (state) => {
      state.addEditDialog.isOpen = false;
    },
    saveSessionStart: (state) => {
      state.addEditDialog.isSaving = true;
      state.list.error = null;
      state.list.success = null;
    },
    saveSessionSuccess: (
      state,
      action: PayloadAction<ApiResponse<SessionRowViewModel>>
    ) => {
      const { data, message } = action.payload;
      state.addEditDialog.isSaving = false;
      state.addEditDialog.isOpen = false;

      const idx = state.list.items.findIndex((i) => i.id === data.id);

      if (idx !== -1) {
        const items = [...state.list.items];
        items[idx] = data;
        state.list.items = items;
      } else {
        state.list.items = [...state.list.items, data];
      }
      state.list.success = message;
    },
    saveSessionError: (state, action: PayloadAction<Response>) => {
      state.addEditDialog.isSaving = false;
      state.addEditDialog.error = action.payload.message;
    },
  },
});

export const {
  // Remove Dialog
  openRemoveDialog,
  closeRemoveDialog,
  removeSessionStart,
  clearRemoveDialogError,
  removeSessionSuccess,
  removeSessionError,

  // Sessions List
  fetchSessionsListStart,
  fetchSessionsListSuccess,
  fetchSessionsListError,
  dismissSesionsListSuccessMessage,
  dismissSesionsListErrorMessage,

  // Add/Edit Dialog
  openAddEditDialog,
  updateAddEditDialogName,
  closeAddEditDialog,
  clearAddEditEdialogError,

  // Save Session
  saveSessionStart,
  saveSessionSuccess,
  saveSessionError,
} = slice.actions;

export const fetchSessionsList = () => (dispatch: Dispatch) => {
  dispatch(fetchSessionsListStart());

  axios
    .get<ApiResponse<SessionRowViewModel[]>>("api/session")
    .then(({ data }) => {
      dispatch(fetchSessionsListSuccess(data));
    })
    .catch(({ response, message }) => {
      if (response) {
        const { data, status } = response;

        if (status !== 500) {
          dispatch(fetchSessionsListError(data));
        } else {
          dispatch(fetchSessionsListError({ message }));
        }
      } else {
        dispatch(fetchSessionsListError({ message }));
      }
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
    .post<ApiResponse<SessionRowViewModel>>("api/session", data)
    .then(({ data }) => {
      dispatch(saveSessionSuccess(data));
    })
    .catch(({ response, message }) => {
      if (response) {
        const { data, status } = response;

        if (status !== 500) {
          dispatch(saveSessionError(data));
        } else {
          dispatch(saveSessionError({ message }));
        }
      } else {
        dispatch(saveSessionError({ message }));
      }
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
    .patch<ApiResponse<SessionRowViewModel>>("api/session", data)
    .then(({ data }) => {
      dispatch(saveSessionSuccess(data));
    })
    .catch(({ response, message }) => {
      if (response) {
        const { data, status } = response;

        if (status !== 500) {
          dispatch(saveSessionError(data));
        } else {
          dispatch(saveSessionError({ message }));
        }
      } else {
        dispatch(saveSessionError({ message }));
      }
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
    .delete<ApiResponse<number>>("api/session/" + id)
    .then(({ data }) => {
      dispatch(removeSessionSuccess(data));
    })
    .catch(({ response, message }) => {
      if (response) {
        const { data, status } = response;

        if (status !== 500) {
          dispatch(removeSessionError(data));
        } else {
          dispatch(removeSessionError({ message }));
        }
      } else {
        dispatch(removeSessionError({ message }));
      }
    });
};

export default slice.reducer;
