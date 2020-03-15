import axios from "../axios";
import { DataSetRowViewModel, DataSetAddViewModel, FileType, ApiResponse } from "../types";
import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { notificationDuration } from "../utils";

export type DataSetsState = {
  isOpen: boolean;
  isLoading: boolean;
  isAdding: boolean;
  isSaving: boolean;
  items: DataSetRowViewModel[];
  itemToAdd: DataSetAddViewModel;
  successMessage: string | null;
  errorMessage: string | null;
  addErrorMessage: string | null;
};

const initialState = {
  isLoading: false,
  isOpen: false,
  isAdding: false,
  isSaving: false,
  items: [],
  itemToAdd: {} as DataSetAddViewModel,
  successMessage: null,
  errorMessage: null,
  addErrorMessage: null
} as DataSetsState;

const slice = createSlice({
  name: "data-set-slice",
  initialState: initialState,
  reducers: {
    openDataSetsModal: state => {
      state.isOpen = true;
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
      state.isAdding = true;
      state.itemToAdd = {
        name: "",
        format: FileType.MPX,
        file: ""
      };
    },
    updateItemToAdd: (state, action) => {
      state.itemToAdd = { ...state.itemToAdd, ...action.payload };
    },
    closeAddDataSetForm: state => {
      state.isAdding = false;
    },
    saveDataSetStart: state => {
      state.isSaving = true;
    },
    saveDataSetSuccess: (state, action: PayloadAction<ApiResponse<DataSetRowViewModel>>) => {
      state.isSaving = false;
      state.isAdding = false;
      state.items = [...state.items, action.payload.data];
      state.successMessage = action.payload.message;
    },
    saveDataSetFailure: (state, action: PayloadAction<string>) => {
      state.isSaving = false;
      state.addErrorMessage = action.payload;
    },
    hideSuccessMessage: state => {
      state.successMessage = null;
    },
    hideErrorMessage: state => {
      state.errorMessage = null;
    },
    hideAddErrorMessage: state => {
      state.addErrorMessage = null;
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
  hideAddErrorMessage
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
      }, notificationDuration)
    });
};

export const saveDataSet = (file: File) => (
  dispatch: Dispatch,
  getState: () => RootState
) => {
  const state = getState();
  const { name, format } = state.dataset.itemToAdd;
  const formData = new FormData();
  formData.append("file", file);
  formData.append("name", name);
  formData.append("format", String(format));

  dispatch(saveDataSetStart());

  axios
    .post<ApiResponse<DataSetRowViewModel>>("/api/dataset", formData)
    .then(response => {
      if (response.status == 200) {
        dispatch(saveDataSetSuccess(response.data));
        setTimeout(() => {
          dispatch(hideSuccessMessage());
        }, notificationDuration)
      } else {
        dispatch(saveDataSetFailure(response.data.message));
        setTimeout(() => {
          dispatch(hideAddErrorMessage());
        }, notificationDuration)
      }
    })
    .catch(reason => {
      dispatch(saveDataSetFailure(reason.message));
      setTimeout(() => {
        dispatch(hideAddErrorMessage());
      }, notificationDuration)
    });
};

export default slice.reducer;
