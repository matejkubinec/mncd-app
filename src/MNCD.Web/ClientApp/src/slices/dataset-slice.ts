import axios from "../axios";
import {
  DataSetRowViewModel,
  DataSetAddViewModel,
  FileType,
  ApiResponse,
  Response,
  DataSetEditViewModel,
} from "../types";
import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { notificationDuration } from "../utils";

export type DataSetsState = {
  isOpen: boolean;
  isLoading: boolean;
  items: DataSetRowViewModel[];
  successMessage: string | null;
  errorMessage: string | null;
  dataSet: DataSetRowViewModel | null;
  add: {
    isOpen: boolean;
    isSaving: boolean;
    item: DataSetAddViewModel | null;
    error: string | null;
  };
  edit: {
    isOpen: boolean;
    isSaving: boolean;
    item: DataSetRowViewModel | null;
    error: string | null;
  };
  remove: {
    isOpen: boolean;
    isRemoving: boolean;
    item: DataSetRowViewModel | null;
    error: string | null;
  };
};

const initialState = {
  isLoading: false,
  isOpen: false,
  items: [],
  successMessage: null,
  errorMessage: null,
  dataSet: null,
  add: {
    isOpen: false,
    isSaving: false,
    item: null,
    error: null,
  },
  edit: {
    isOpen: false,
    isSaving: false,
    item: null,
    error: null,
  },
  remove: {
    isOpen: false,
    isRemoving: false,
    item: null,
    error: null,
  },
} as DataSetsState;

const slice = createSlice({
  name: "data-set-slice",
  initialState: initialState,
  reducers: {
    openDataSetsModal: (state) => {
      state.isOpen = true;
      state.dataSet = null;
    },
    closeDataSetsModal: (state) => {
      state.isOpen = false;
    },
    fetchDataSetsListStart: (state) => {
      state.isLoading = true;
    },
    fetchDataSetsListSuccess: (
      state,
      action: PayloadAction<ApiResponse<DataSetRowViewModel[]>>
    ) => {
      state.isLoading = false;
      state.items = action.payload.data;
    },
    fetchDataSetsListFailure: (state, action: PayloadAction<Response>) => {
      state.isLoading = false;
      state.errorMessage = action.payload.message;
    },
    openAddDataSetForm: (state) => {
      state.add.isOpen = true;
      state.add.item = {
        name: "",
        format: FileType.MPX,
        file: "",
      };
    },
    updateItemToAdd: (state, action) => {
      state.add.item = { ...state.add.item, ...action.payload };
    },
    closeAddDataSetForm: (state) => {
      state.add.isOpen = false;
    },
    saveDataSetStart: (state) => {
      state.add.isSaving = true;
    },
    saveDataSetSuccess: (
      state,
      action: PayloadAction<ApiResponse<DataSetRowViewModel>>
    ) => {
      state.add.isSaving = false;
      state.items = [...state.items, action.payload.data];
      state.successMessage = action.payload.message;
    },
    saveDataSetFailure: (state, action: PayloadAction<Response>) => {
      state.add.isSaving = false;
      state.add.error = action.payload.message;
    },
    hideSuccessMessage: (state) => {
      state.successMessage = null;
    },
    hideErrorMessage: (state) => {
      state.errorMessage = null;
    },
    hideAddErrorMessage: (state) => {
      state.add.error = null;
    },
    selectDataSet: (state, action: PayloadAction<DataSetRowViewModel>) => {
      state.dataSet = action.payload;
    },
    openEditDataSetForm: (
      state,
      action: PayloadAction<DataSetRowViewModel>
    ) => {
      state.edit.isOpen = true;
      state.edit.item = action.payload;
    },
    closeEditDataSetForm: (state) => {
      state.edit.isOpen = false;
      state.edit.item = null;
    },
    editDataSetItemName: (state, action: PayloadAction<string>) => {
      if (state.edit.item) {
        state.edit.item.name = action.payload;
      }
    },
    editDataSetStart: (state) => {
      state.edit.isSaving = true;
    },
    editDataSetSuccess: (
      state,
      action: PayloadAction<ApiResponse<DataSetRowViewModel>>
    ) => {
      state.edit.isSaving = false;
      const items = state.items;
      const idx = items.findIndex((i) => i.id === action.payload.data.id);
      items[idx] = action.payload.data;
      state.items = items;
      state.successMessage = action.payload.message;
    },
    editDataSetFailure: (state, action: PayloadAction<Response>) => {
      state.edit.isSaving = false;
      state.edit.error = action.payload.message;
    },
    hideEditDataSetError: (state) => {
      state.edit.error = null;
    },
    openRemoveDataSetForm: (
      state,
      action: PayloadAction<DataSetRowViewModel>
    ) => {
      state.remove.isOpen = true;
      state.remove.item = action.payload;
    },
    closeRemoveDataSetForm: (state) => {
      state.remove.isOpen = false;
      state.remove.item = null;
    },
    removeDataSetStart: (state) => {
      state.remove.isRemoving = true;
    },
    removeDataSetSuccess: (
      state,
      action: PayloadAction<ApiResponse<number>>
    ) => {
      state.remove.isRemoving = false;
      state.items = state.items.filter((i) => i.id !== action.payload.data);
      state.dataSet = null;
      state.successMessage = action.payload.message;
    },
    removeDataSetFailure: (state, action: PayloadAction<Response>) => {
      state.remove.isRemoving = false;
      state.remove.error = action.payload.message;
    },
    hideRemoveDataSetError: (state) => {
      state.remove.error = null;
    },
  },
});

export const {
  openDataSetsModal,
  closeDataSetsModal,

  fetchDataSetsListStart,
  fetchDataSetsListSuccess,
  fetchDataSetsListFailure,

  openAddDataSetForm,
  updateItemToAdd,
  closeAddDataSetForm,

  saveDataSetStart,
  saveDataSetSuccess,
  saveDataSetFailure,

  hideSuccessMessage,
  hideErrorMessage,
  hideAddErrorMessage,

  selectDataSet,

  openEditDataSetForm,
  closeEditDataSetForm,
  editDataSetItemName,
  editDataSetSuccess,
  editDataSetStart,
  editDataSetFailure,
  hideEditDataSetError,

  openRemoveDataSetForm,
  closeRemoveDataSetForm,
  removeDataSetStart,
  removeDataSetSuccess,
  removeDataSetFailure,
  hideRemoveDataSetError,
} = slice.actions;

export const fetchDataSetsList = () => (dispatch: Dispatch) => {
  dispatch(fetchDataSetsListStart());

  axios
    .get<ApiResponse<DataSetRowViewModel[]>>("/api/dataset")
    .then(({ data }) => {
      dispatch(fetchDataSetsListSuccess(data));
    })
    .catch(({ response, message }) => {
      if (response) {
        const { data, status } = response;

        if (status !== 500) {
          dispatch(fetchDataSetsListFailure(data));
        } else {
          dispatch(fetchDataSetsListFailure({ message }));
        }
      } else {
        dispatch(fetchDataSetsListFailure({ message }));
      }

      setTimeout(() => {
        dispatch(hideErrorMessage());
      }, notificationDuration);
    });
};

export const saveDataSet = (file: File) => (
  dispatch: Dispatch,
  getState: () => RootState
) => {
  const state = getState();
  const item = state.dataset.add.item;

  if (!item) {
    dispatch(saveDataSetFailure({ message: "Item is not valid." }));
    return;
  }

  const { name, format } = item;
  const formData = new FormData();
  formData.append("file", file);
  formData.append("name", name);
  formData.append("format", String(format));

  dispatch(saveDataSetStart());

  axios
    .post<ApiResponse<DataSetRowViewModel>>("/api/dataset", formData)
    .then(({ data }) => {
      dispatch(saveDataSetSuccess(data));
      dispatch(closeAddDataSetForm());

      setTimeout(() => {
        dispatch(hideSuccessMessage());
      }, notificationDuration);
    })
    .catch(({ response, message }) => {
      if (response) {
        const { data, status } = response;

        if (status !== 500) {
          dispatch(saveDataSetFailure(data));
        } else {
          dispatch(saveDataSetFailure({ message }));
        }
      } else {
        dispatch(saveDataSetFailure({ message }));
      }

      setTimeout(() => {
        dispatch(hideAddErrorMessage());
      }, notificationDuration);
    });
};

export const editDataSet = (item: DataSetEditViewModel) => (
  dispatch: Dispatch
) => {
  dispatch(editDataSetStart());
  axios
    .patch<ApiResponse<DataSetRowViewModel>>("/api/dataset", item)
    .then(({ data }) => {
      dispatch(editDataSetSuccess(data));
      dispatch(closeEditDataSetForm());
    })
    .catch(({ response, message }) => {
      if (response) {
        const { data, status } = response;

        if (status !== 500) {
          dispatch(editDataSetFailure(data));
        } else {
          dispatch(editDataSetFailure({ message }));
        }
      } else {
        dispatch(editDataSetFailure({ message }));
      }
    })
    .finally(() => {
      setTimeout(() => {
        dispatch(hideSuccessMessage());
        dispatch(hideEditDataSetError());
      }, notificationDuration);
    });
};

export const removeDataSet = (id: number) => (dispatch: Dispatch) => {
  dispatch(removeDataSetStart());
  axios
    .delete<ApiResponse<number>>(`/api/dataset/${id}`)
    .then(({ data }) => {
      dispatch(removeDataSetSuccess(data));
      dispatch(closeRemoveDataSetForm());
    })
    .catch(({ response, message }) => {
      if (response) {
        const { data, status } = response;

        if (status !== 500) {
          dispatch(removeDataSetFailure(data));
        } else {
          dispatch(removeDataSetFailure({ message }));
        }
      } else {
        dispatch(removeDataSetFailure({ message }));
      }
    })
    .finally(() => {
      setTimeout(() => {
        dispatch(hideSuccessMessage());
        dispatch(hideRemoveDataSetError());
      }, notificationDuration);
    });
};

export default slice.reducer;
