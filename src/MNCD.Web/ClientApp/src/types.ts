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
