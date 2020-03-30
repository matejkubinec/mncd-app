import axios from "../axios";
import {
  DataSetRowViewModel,
  DataSetAddViewModel,
  FileType,
  ApiResponse,
  DataSetEditViewModel
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
    error: null
  },
  edit: {
    isOpen: false,
    isSaving: false,
    item: null,
    error: null
  },
  remove: {
    isOpen: false,
    isRemoving: false,
    item: null,
    error: null
  }
} as DataSetsState;

const slice = createSlice({
  name: "data-set-slice",
  initialState: initialState,
  reducers: {
    openDataSetsModal: state => {
      state.isOpen = true;
      state.dataSet = null;
    },
    closeDataSetsModal: state => {
      state.isOpen = false;
    },
    fetchDataSetsListStart: state => {
      state.isLoading = true;
    },
    fetchDataSetsListSuccess: (state, action) => {
      state.isLoading = false;
      state.items = action.payload;
    },
    fetchDataSetsListFailure: (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload;
    },
    openAddDataSetForm: state => {
      state.add.isOpen = true;
      state.add.item = {
        name: "",
        format: FileType.MPX,
        file: ""
      };
    },
    updateItemToAdd: (state, action) => {
      state.add.item = { ...state.add.item, ...action.payload };
    },
    closeAddDataSetForm: state => {
      state.add.isOpen = false;
    },
    saveDataSetStart: state => {
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
    saveDataSetFailure: (state, action: PayloadAction<string>) => {
      state.add.isSaving = false;
      state.add.error = action.payload;
    },
    hideSuccessMessage: state => {
      state.successMessage = null;
    },
    hideErrorMessage: state => {
      state.errorMessage = null;
    },
    hideAddErrorMessage: state => {
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
    closeEditDataSetForm: state => {
      state.edit.isOpen = false;
      state.edit.item = null;
    },
    editDataSetItemName: (state, action: PayloadAction<string>) => {
      if (state.edit.item) {
        state.edit.item.name = action.payload;
      }
    },
    editDataSetStart: state => {
      state.edit.isSaving = true;
    },
    editDataSetSuccess: (
      state,
      action: PayloadAction<ApiResponse<DataSetRowViewModel>>
    ) => {
      state.edit.isSaving = false;
      const items = state.items;
      const idx = items.findIndex(i => i.id === action.payload.data.id);
      items[idx] = action.payload.data;
      state.items = items;
      state.successMessage = action.payload.message;
    },
    editDataSetFailure: (state, action: PayloadAction<string>) => {
      state.edit.isSaving = false;
      state.edit.error = action.payload;
    },
    hideEditDataSetError: state => {
      state.edit.error = null;
    },
    openRemoveDataSetForm: (
      state,
      action: PayloadAction<DataSetRowViewModel>
    ) => {
      state.remove.isOpen = true;
      state.remove.item = action.payload;
    },
    closeRemoveDataSetForm: state => {
      state.remove.isOpen = false;
      state.remove.item = null;
    },
    removeDataSetStart: state => {
      state.remove.isRemoving = true;
    },
    removeDataSetSuccess: (
      state,
      action: PayloadAction<ApiResponse<number>>
    ) => {
      state.remove.isRemoving = false;
      state.items = state.items.filter(i => i.id !== action.payload.data);
      state.dataSet = null;
      state.successMessage = action.payload.message;
    },
    removeDataSetFailure: (state, action: PayloadAction<string>) => {
      state.remove.isRemoving = false;
      state.remove.error = action.payload;
    },
    hideRemoveDataSetError: state => {
      state.remove.error = null;
    }
  }
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
  hideRemoveDataSetError
} = slice.actions;

export const fetchDataSetsList = () => (dispatch: Dispatch) => {
  dispatch(fetchDataSetsListStart());

  axios
    .get<DataSetRowViewModel[]>("/api/dataset")
    .then(response => {
      dispatch(fetchDataSetsListSuccess(response.data));
    })
    .catch(reason => {
      dispatch(fetchDataSetsListFailure(reason.message));
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
    dispatch(saveDataSetFailure("Item is not valid."));
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
    .then(response => {
      if (response.status === 200) {
        dispatch(saveDataSetSuccess(response.data));
        dispatch(closeAddDataSetForm());
        setTimeout(() => {
          dispatch(hideSuccessMessage());
        }, notificationDuration);
      } else {
        dispatch(saveDataSetFailure(response.data.message));
        setTimeout(() => {
          dispatch(hideAddErrorMessage());
        }, notificationDuration);
      }
    })
    .catch(reason => {
      dispatch(saveDataSetFailure(reason.message));
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
    .then(response => {
      if (response.status === 200) {
        dispatch(editDataSetSuccess(response.data));
        dispatch(closeEditDataSetForm());
        setTimeout(() => {
          dispatch(hideSuccessMessage());
        }, notificationDuration);
      } else {
        dispatch(editDataSetFailure(response.statusText));
        setTimeout(() => {
          dispatch(hideEditDataSetError());
        }, notificationDuration);
      }
    })
    .catch(reason => {
      dispatch(editDataSetFailure(reason.message));
      setTimeout(() => {
        dispatch(hideEditDataSetError());
      }, notificationDuration);
    });
};

export const removeDataSet = (id: number) => (dispatch: Dispatch) => {
  dispatch(removeDataSetStart());
  axios
    .delete<ApiResponse<number>>(`/api/dataset/${id}`)
    .then(response => {
      if (response.status === 200) {
        dispatch(removeDataSetSuccess(response.data));
        dispatch(closeRemoveDataSetForm());
        setTimeout(() => {
          dispatch(hideSuccessMessage());
        }, notificationDuration);
      } else {
        dispatch(removeDataSetFailure(response.statusText));
        setTimeout(() => {
          dispatch(hideRemoveDataSetError());
        }, notificationDuration);
      }
    })
    .catch(reason => {
      dispatch(removeDataSetFailure(reason.message));
      setTimeout(() => {
        dispatch(hideRemoveDataSetError());
      }, notificationDuration);
    });
};

export default slice.reducer;
