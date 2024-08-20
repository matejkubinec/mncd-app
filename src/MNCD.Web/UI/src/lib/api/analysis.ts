import { Analysis } from '@lib/types/analysis';
import { api } from './api';

export const getAnalysis = async (id: number): Promise<Analysis> => {
  const res = await api.get<Analysis>(`/api/analysis/${id}`);
  return res.data;
};
