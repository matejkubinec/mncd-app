import axios from "../axios";
import { DataSetRowViewModel, DataSetAddViewModel } from "../types";
import { createSlice, Dispatch } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type DataSetsDetailState = {
  isSaving: boolean;
  item: DataSetAddViewModel;
  successMessage: string;
  errorMessage: string;
};

const initialState = {
  list: {
    isLoading: false,
    items: [] as DataSetRowViewModel[]
  },
  detail: {
    isSaving: false,
    item: {} as DataSetAddViewModel,
    successMessage: "",
    errorMessage: ""
  } as DataSetsDetailState
};

const slice = createSlice({
  name: "data-set-slice",
  initialState: initialState,
  reducers: {
    fetchDataSetsListStart: state => {
      state.list.isLoading = true;
    },
    fetchDataSetsListSuccess: (state, action) => {
      state.list.isLoading = false;
      state.list.items = action.payload;
    },
    updateDataSetsDetailItem: (state, action) => {
      state.detail.item = { ...state.detail.item, ...action.payload };
    },
    saveDataSetStart: state => {
      state.detail.isSaving = true;
    },
    saveDataSetSuccess: (state, action) => {
      state.detail.isSaving = false;
    }
  }
});

export const {
  fetchDataSetsListStart,
  fetchDataSetsListSuccess,
  updateDataSetsDetailItem,
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
  const { name } = state.dataset.detail.item;
  const formData = new FormData();
  formData.append("file", file);
  formData.append("name", name);

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
