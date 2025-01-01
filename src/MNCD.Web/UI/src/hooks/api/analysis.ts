import { getAnalysis, triggerAnalysis, updateNotes } from '@lib/api/analysis';
import { NotesForm } from '@lib/form/notes.form';
import { Analysis, AnalysisRequest } from '@lib/types/analysis';
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query';

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

export const useUpdateNotes = (
  options?: Partial<UseMutationOptions<unknown, Error, NotesForm>>,
) =>
  useMutation({
    mutationKey: ['update-analysis-notes'],
    mutationFn: (values) => updateNotes(values.analysisId, values.notes),
    ...options,
  });
