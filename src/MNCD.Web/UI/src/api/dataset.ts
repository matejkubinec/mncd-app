import { Dataset } from '../lib/types/dataset.types';
import { api } from './api';

export const getDatasets = async () => {
  const res = await api.get<Dataset[]>('/api/dataset');
  return res.data;
};
