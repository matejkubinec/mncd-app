export enum AnalysisApproach {
  MultiLayer = 0,
  SingleLayerOnly = 1,
  SingleLayerFlattening = 2,
}

export enum AnalysisAlgorithm {
  FluidC = 0,
  Louvain = 1,
  KClique = 2,
  CLECC = 3,
  ABACUS = 4,
  LabelPropagation = 5,
}

export enum FlattenningAlgorithm {
  BasicFlattening = 0,
  LocalSimplification = 1,
  MergeFlattening = 2,
  WeightedFlattening = 3,
}

export interface AnalysisRequest {
  id: number;
  sessionId: number;

  approach: AnalysisApproach;

  datasetId: number;
  dataSetName: string;

  selectedLayer: number;
  selectedLayerName: string;

  analysisAlgorithm: AnalysisAlgorithm;

  flatteningAlgorithm: FlattenningAlgorithm;
}

export interface AnalysisResult {
  id: number;
}

export interface AnalysisImage {
  title: string;
  url: string;
}

export interface AnalysisVisualization {
  multiLayer: AnalysisImage[];
  multiLayerCommunities: AnalysisImage[];
  singleLayer: AnalysisImage[];
  singleLayerCommunities: AnalysisImage[];
  communitySizes: AnalysisImage[];
}

export interface Analysis {
  id: number;
  request: AnalysisRequest;
  result: AnalysisResult;
}
