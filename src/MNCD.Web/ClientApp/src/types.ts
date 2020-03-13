export interface Dictionary<T> {
  [Key: string]: T;
}

export enum AnalysisApproach {
  MultiLayer = 0,
  SingleLayerOnly = 1,
  SingleLayerFlattening = 2
}

export enum AnalysisAlgorithm {
  FluidC = 0,
  Louvain = 1,
  KClique = 2
}

export enum FlattenningAlgorithm {
  BasicFlattening = 0,
  LocalSimplification = 1,
  MergeFlattening = 2,
  WeightedFlattening = 3
}

export enum FileType {
  MPX = 0,
  EdgeList = 1
}

export interface DataSetRowViewModel {
  id: number;
  name: string;
  nodeCount: number;
  edgeCount: number;
  layerCount: number;
  layerNames: string[];
}

export interface DataSetAddViewModel {
  name: string;
  file: string;
  format: FileType;
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
  sessionId: number;
  datasetId: number;
  selectedLayer: number;
  approach: AnalysisApproach;

  analysisAlgorithm: AnalysisAlgorithm;
  analysisAlgorithmParameters: Dictionary<string>;

  flatteningAlgorithm: FlattenningAlgorithm;
  flatteningAlgorithmParameters: Dictionary<string>;
}

export interface AnalysisResultViewModel {
  id: number;

  averageVariety: number | null;
  varieties: number[];

  averageExclusivity: number | null;
  exclusivities: number[];

  averageHomogenity: number | null;
  homogenities: number[];

  coverage: number | null;
  performance: number | null;
  modularity: number | null;
}

export interface AnalysisVisualizationItemViewModel {
  title: string;
  url: string;
}

export interface AnalysisVisualizationViewModel {
  multiLayer: AnalysisVisualizationItemViewModel[];
  multiLayerCommunities: AnalysisVisualizationItemViewModel[];

  singleLayer: AnalysisVisualizationItemViewModel[];
  singleLayerCommunities: AnalysisVisualizationItemViewModel[];

  communitiesBarplot: AnalysisVisualizationItemViewModel;
  communitiesTreemap: AnalysisVisualizationItemViewModel;
}

export interface AnalysisViewModel {
  id: number;
  isOpen: boolean;
  request: AnalysisRequestViewModel;
  result: AnalysisResultViewModel;
  visualization: AnalysisVisualizationViewModel;
}

export interface AnalysisSessionViewModel {
  id: number;
  name: string;
  guid: string;
  createDate: Date;
  analyses: AnalysisViewModel[];
}

export interface ApiResponse<T> {
  message: string;
  data: T;
}
