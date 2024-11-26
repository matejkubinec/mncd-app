import { getAnalysis, triggerAnalysis } from '@lib/api/analysis';
import { Analysis, AnalysisRequest } from '@lib/types/analysis';
import { useMutation, useQuery, UseQueryOptions } from '@tanstack/react-query';

export const useAnalysis = (
  id: number,
  options?: Partial<UseQueryOptions<Analysis>>,
) =>
  useQuery({
    queryKey: ['analysis', id],
    queryFn: () => getAnalysis(id),
    ...options,
  });

export const useTriggerAnalysis = () =>
  useMutation({
    mutationKey: ['trigger-analysis'],
    mutationFn: (values: AnalysisRequest) => triggerAnalysis(values),
  });
