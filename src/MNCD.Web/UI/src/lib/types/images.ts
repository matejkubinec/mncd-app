import { AnalysisVisualization } from './analysis';

export type VisualizationType = keyof AnalysisVisualization;

export enum Visualization {
  SingleLayer = 'singleLayer',
  SingleLayerCommunities = 'singleLayerCommunities',
  MultiLayer = 'multiLayer',
  MultiLayerCommunities = 'multiLayerCommunities',
  CommunitySizes = 'communitySizes',
}
