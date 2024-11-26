import { Analysis, AnalysisResult, AnalyzePayload } from '@lib/types/analysis';
import { api } from './api';

export const getAnalysis = async (id: number): Promise<Analysis> => {
  const res = await api.get<Analysis>(`/api/analysis/${id}`);
  return res.data;
};

export const triggerAnalysis = async (payload: AnalyzePayload) => {
  const body: AnalyzePayload = {
    ...payload,
  };

  if (
    body.flatteningAlgorithm !== undefined &&
    body.flatteningAlgorithmParameters !== undefined
  ) {
    const entries = Object.entries(body.flatteningAlgorithmParameters);
    for (const [key, value] of entries) {
      body.flatteningAlgorithmParameters![key] = JSON.stringify(value);
    }
  }

  const res = await api.post<AnalysisResult, AnalyzePayload>(
    `/api/analysis`,
    body,
  );
  return res.data;
};
