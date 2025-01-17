import { AnalysisAlgorithm, AnalysisApproach } from '@lib/types/analysis';

export interface AnalyzeFormValues {
  sessionId?: number;
  datasetId?: number;
  approach?: AnalysisApproach;
  selectedLayer?: number;

  analysisAlgorithm?: AnalysisAlgorithm;
  analysisAlgorithmParameters?: Record<string, number | string>;

  flatteningAlgorithm?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  flatteningAlgorithmParameters?: Record<string, any>;
}

export const defaultValues: AnalyzeFormValues = {
  approach: AnalysisApproach.SingleLayerOnly,
};
