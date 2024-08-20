import {
  AnalysisAlgorithm,
  AnalysisApproach,
  FlattenningAlgorithm,
} from './types/analysis';

export const APPROACH_NAME: Record<AnalysisApproach, string> = {
  [AnalysisApproach.MultiLayer]: 'Multi Layer',
  [AnalysisApproach.SingleLayerOnly]: 'Single Layer',
  [AnalysisApproach.SingleLayerFlattening]: 'Single Layer - Flattening',
};

export const ANALYSIS_ALGORITHM_NAME: Record<AnalysisAlgorithm, string> = {
  [AnalysisAlgorithm.FluidC]: 'FluidC',
  [AnalysisAlgorithm.Louvain]: 'Louvain',
  [AnalysisAlgorithm.KClique]: 'KClique',
  [AnalysisAlgorithm.CLECC]: 'CLECC Community Detection',
  [AnalysisAlgorithm.ABACUS]: 'ABACUS',
  [AnalysisAlgorithm.LabelPropagation]: 'Label Propagation',
};

export const FLATTENING_NAME: Record<FlattenningAlgorithm, string> = {
  [FlattenningAlgorithm.BasicFlattening]: 'Basic Flattening',
  [FlattenningAlgorithm.LocalSimplification]: 'Local Simplification',
  [FlattenningAlgorithm.MergeFlattening]: 'Merge Flattening',
  [FlattenningAlgorithm.WeightedFlattening]: 'Weighted Flattening',
};
