export interface DatasetListItem {
  id: number;
  name: string;
  nodeCount: number;
  edgeCount: number;
  layerCount: number;
  layerNames: string[];
}

export interface Dataset {
  id: number;
  name: string;
  nodeCount: number;
  edgeCount: number;
  layerCount: number;
  fileType: DatasetFormat;
  diagonalUrl: string;
  slicesUrl: string;
  layerNames: string[];
  actorNames: string[];
}

export enum DatasetFormat {
  MPX = 0,
  EdgeList = 1,
}
