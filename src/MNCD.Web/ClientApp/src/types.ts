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
