export interface Dictionary<T> {
  [Key: string]: T;
}

export const enum AnalysisApproach {
  MultiLayer = 0,
  SingleLayerOnly = 1,
  SingleLayerFlattening = 2
}

export const enum AnalysisAlgorithm {
  FluidC = 0,
  Louvain = 1
}

export const enum FlattenningAlgorithm {
  BasicFlattening = 0,
  LocalSimplification = 1,
  MergeFlattening = 2,
  WeightedFlattening = 3
}

export const enum FileType {
  MPX = 0
}

export interface DataSetRowViewModel {
  id: number;
  name: string;
  nodeCount: number;
  edgeCount: number;
  layerCount: number;
}

export interface DataSetAddViewModel {
  name: string;
  file: File;
}

export interface SessionRowViewModel {
  id: number;
  guid: string;
  name: string;
  analysesCount: number;
  createDate: Date;
}

export interface AnalysisRequestViewModel {
  id: number;
  datasetId: number;
  selectedLayer: number;
  approach: AnalysisApproach;

  analysisAlgorithm: AnalysisAlgorithm;
  analysisAlgorithmParameters: Dictionary<string>;

  flatteningAlgorithm: FlattenningAlgorithm;
  flatteningAlgorithmParameters: Dictionary<string>;
}
