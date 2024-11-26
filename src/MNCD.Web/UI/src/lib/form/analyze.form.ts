import { AnalysisAlgorithm, AnalysisApproach } from '@lib/types/analysis';

export interface AnalyzeFormValues {
  sessionId?: number;
  datasetId?: number;
  approach?: AnalysisApproach;
  selectedLayer?: number;
  analysisAlgorithm?: AnalysisAlgorithm;
  analysisAlgorithmParameters?: Record<string, number | string>;
}

export const defaultValues: AnalyzeFormValues = {
  approach: AnalysisApproach.SingleLayerOnly,
};
