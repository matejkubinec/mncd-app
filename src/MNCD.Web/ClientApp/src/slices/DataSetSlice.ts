import axios from "../axios";
import { DataSetRowViewModel, DataSetAddViewModel, FileType } from "../types";
import { createSlice, Dispatch } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type DataSetsState = {
  isOpen: boolean;
  isLoading: boolean;
  isAdding: boolean;
  isSaving: boolean;
  items: DataSetRowViewModel[];
  itemToAdd: DataSetAddViewModel;
};

const initialState = {
  isLoading: false,
  isOpen: false,
  isAdding: false,
  isSaving: false,
  items: [],
  itemToAdd: {} as DataSetAddViewModel
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
    saveDataSetSuccess: (state, action) => {
      state.isSaving = false;
      state.isAdding = false;
    }
  }
});

export const {
  openDataSetsModal,
  closeDataSetsModal,
  fetchDataSetsListStart,
  fetchDataSetsListSuccess,
  openAddDataSetForm,
  updateItemToAdd,
  closeAddDataSetForm,
  saveDataSetStart,
  saveDataSetSuccess
} = slice.actions;

export const fetchDataSetsList = () => (dispatch: Dispatch) => {
  dispatch(fetchDataSetsListStart());

  axios
    .get<DataSetRowViewModel[]>("/api/dataset")
    .then(response => {
      dispatch(fetchDataSetsListSuccess(response.data));
    })
    .catch(reason => {
      console.log(reason);
      // TODO: react handle error
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
    .post<string>("/api/dataset", formData)
    .then(response => {
      const data = response.data;

      if (response.status == 200) {
        dispatch(saveDataSetSuccess(data));
        dispatch(fetchDataSetsList() as any);
      } else {
        dispatch(saveDataSetSuccess(data));
      }
    })
    .catch(reason => {
      // TODO: react handle error
      console.log(reason);
    });
};

export default slice.reducer;
