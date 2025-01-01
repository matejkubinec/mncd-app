import { SelectOption } from '@components/select';
import {
  AnalysisAlgorithm,
  AnalysisApproach,
  FlattenningAlgorithm,
} from './types/analysis';
import { Visualization, VisualizationType } from './types/images';

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

export const VISUALIZATION_NAME: Record<VisualizationType, string> = {
  singleLayer: 'Single Layer',
  singleLayerCommunities: 'Single Layer - Communities',
  multiLayer: 'Multi Layer',
  multiLayerCommunities: 'Multi Layer - Communities',
  communitySizes: 'Community Sizes',
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

export const MULTI_LAYER_ALGORITHM_OPTIONS: SelectOption[] = [
  AnalysisAlgorithm.CLECC,
]
  .map((alg) => ({ label: ANALYSIS_ALGORITHM_NAME[alg], value: alg }))
  .sort((a, b) => a.label.localeCompare(b.label));

export const FLATTENING_OPTIONS: SelectOption[] = [
  FlattenningAlgorithm.BasicFlattening,
  FlattenningAlgorithm.LocalSimplification,
  FlattenningAlgorithm.MergeFlattening,
  FlattenningAlgorithm.WeightedFlattening,
]
  .map((approach) => ({ label: FLATTENING_NAME[approach], value: approach }))
  .sort((a, b) => a.label.localeCompare(b.label));

export const VISUALIZATION_OPTIONS: SelectOption[] = [
  Visualization.MultiLayer,
  Visualization.MultiLayerCommunities,
  Visualization.SingleLayer,
  Visualization.SingleLayerCommunities,
  Visualization.CommunitySizes,
].map((visualization) => ({
  label: VISUALIZATION_NAME[visualization],
  value: visualization,
}));
