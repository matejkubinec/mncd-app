import {
  Dataset,
  DatasetListItem,
  PatchDatasetPayload,
} from '@lib/types/dataset';
import { api } from './api';

export const getDatasets = async () => {
  const res = await api.get<DatasetListItem[]>('/api/dataset');
  return res.data;
};

export const getDataset = async (id: number) => {
  const res = await api.get<Dataset>(`/api/dataset/${id}`);
  return res.data;
};

export const addDataset = async (formData: FormData) => {
  const res = await api.post<Dataset>('/api/dataset', undefined, formData);
  return res.data;
};

export const patchDataset = async (payload: PatchDatasetPayload) => {
  const res = await api.patch<Dataset, PatchDatasetPayload>(
    '/api/dataset',
    payload,
  );
  return res.data;
};

export const deleteDataset = async (id: number) => {
  const res = await api.delete(`/api/dataset/${id}`);
  return res.data;
};
