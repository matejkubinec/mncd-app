import { Analysis, AnalysisResult, AnalyzePayload } from '@lib/types/analysis';
import { api } from './api';

export const getAnalysis = async (id: number): Promise<Analysis> => {
  const res = await api.get<Analysis>(`/api/analysis/${id}`);
  return res.data;
};

export const triggerAnalysis = async (payload: AnalyzePayload) => {
  const res = await api.post<AnalysisResult, AnalyzePayload>(
    `/api/analysis`,
    payload,
  );
  return res.data;
};
