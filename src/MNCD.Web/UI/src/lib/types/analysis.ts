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
  analysisAlgorithmParameters: Record<string, string>;

  flatteningAlgorithm: FlattenningAlgorithm;
  flatteningAlgorithmParameters: Record<string, string>;
}

export interface AnalyzePayload {
  sessionId: number;
  datasetId: number;
  selectedLayer: number;

  approach: AnalysisApproach;
  analysisAlgorithm: AnalysisAlgorithm;
  analysisAlgorithmParameters?: Record<string, number | string>;

  flatteningAlgorithm?: FlattenningAlgorithm;
  flatteningAlgorithmParameters?: Record<string, any>;
}

export interface ActorItem {
  idx: number;
  name: string;
}

export interface AnalysisCommunityDetail {
  name: string;
  actorCount: number;
  actors: ActorItem[];
}

export interface AnalysisResult {
  id: number;
  averageVariety: number | null;
  varieties: number[];

  averageExclusivity: number | null;
  exclusivities: number[];

  averageHomogenity: number | null;
  homogenities: number[];

  averageCoverage: number | null;
  coverages: number[] | null;

  averagePerformance: number | null;
  performances: number[] | null;

  averageModularity: number | null;
  modularities: number[] | null;

  coverage: number | null;
  performance: number | null;
  modularity: number | null;

  communityDetails: AnalysisCommunityDetail[];
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
  notes: string | null;
  request: AnalysisRequest;
  result: AnalysisResult;
}
