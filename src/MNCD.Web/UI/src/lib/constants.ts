import { SelectOption } from '@components/select';
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

export const APPROACH_OPTIONS: SelectOption[] = [
  AnalysisApproach.SingleLayerOnly,
  AnalysisApproach.SingleLayerFlattening,
  AnalysisApproach.MultiLayer,
]
  .map((approach) => ({ label: APPROACH_NAME[approach], value: approach }))
  .sort((a, b) => a.label.localeCompare(b.label));

export const SINGLE_LAYER_ALGORITHM_OPTIONS: SelectOption[] = [
  AnalysisAlgorithm.FluidC,
  AnalysisAlgorithm.Louvain,
  AnalysisAlgorithm.KClique,
  AnalysisAlgorithm.LabelPropagation,
]
  .map((alg) => ({ label: ANALYSIS_ALGORITHM_NAME[alg], value: alg }))
  .sort((a, b) => a.label.localeCompare(b.label));
