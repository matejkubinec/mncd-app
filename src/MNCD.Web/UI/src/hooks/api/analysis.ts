import {
  downloadAnalysis,
  getAnalysis,
  removeAnalysis,
  triggerAnalysis,
  updateNotes,
} from '@lib/api/analysis';
import { NotesForm } from '@lib/form/notes.form';
import { Analysis, AnalysisResult, AnalyzePayload } from '@lib/types/analysis';
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

export const useTriggerAnalysis = (
  options?: Partial<UseMutationOptions<AnalysisResult, Error, AnalyzePayload>>,
) =>
  useMutation({
    mutationKey: ['trigger-analysis'],
    mutationFn: triggerAnalysis,
    ...options,
  });

export const useUpdateNotes = (
  options?: Partial<UseMutationOptions<unknown, Error, NotesForm>>,
) =>
  useMutation({
    mutationKey: ['update-analysis-notes'],
    mutationFn: (values) => updateNotes(values.analysisId, values.notes),
    ...options,
  });

export const useDownloadAnalysis = (
  options?: Partial<UseMutationOptions<unknown, Error, number>>,
) =>
  useMutation({
    mutationKey: ['download-anlysis'],
    mutationFn: (analysisId) => downloadAnalysis(analysisId),
    ...options,
  });

export const useRemoveAnalysis = (
  options?: Partial<UseMutationOptions<unknown, Error, number>>,
) =>
  useMutation({
    mutationKey: ['remove-anlysis'],
    mutationFn: (analysisId) => removeAnalysis(analysisId),
    ...options,
  });
