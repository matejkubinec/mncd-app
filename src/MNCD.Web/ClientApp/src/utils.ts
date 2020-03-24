import {
  AnalysisApproach,
  AnalysisAlgorithm,
  FlattenningAlgorithm
} from "./types";

export function approachToString(approach: AnalysisApproach) {
  switch (approach) {
    case AnalysisApproach.MultiLayer:
      return "Multi Layer";
    case AnalysisApproach.SingleLayerFlattening:
      return "Single Layer - Flattening";
    case AnalysisApproach.SingleLayerOnly:
      return "Single Layer";
    default:
      return "";
  }
}

export function analysisToString(algorithm: AnalysisAlgorithm) {
  switch (algorithm) {
    case AnalysisAlgorithm.FluidC:
      return "FluidC";
    case AnalysisAlgorithm.Louvain:
      return "Louvain";
    case AnalysisAlgorithm.KClique:
      return "KClique";
    case AnalysisAlgorithm.CLECC:
      return "CLECC Community Detection";
  }
}

export function flatteningToString(algorithm: FlattenningAlgorithm) {
  switch (algorithm) {
    case FlattenningAlgorithm.BasicFlattening:
      return "Basic Flattening";
    case FlattenningAlgorithm.LocalSimplification:
      return "Local Simplification";
    case FlattenningAlgorithm.MergeFlattening:
      return "Merge Flattening";
    case FlattenningAlgorithm.WeightedFlattening:
      return "Weighted Flattening";
  }
}

export const notificationDuration = 5000; // ms
