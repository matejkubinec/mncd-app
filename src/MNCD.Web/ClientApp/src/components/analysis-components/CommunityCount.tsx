import React, { Component } from "react";
import { Stack } from "office-ui-fabric-react";
import { AnalysisVisualizationViewModel } from "../../types";
import { NeutralColors } from "@uifabric/fluent-theme/lib/fluent/FluentColors";
import { Depths } from "@uifabric/fluent-theme/lib/fluent/FluentDepths";
import ImageGallery from "../common/ImageGallery";

interface IProps {
  visualization: AnalysisVisualizationViewModel;
}

export default class CommunityCount extends Component<IProps> {
  render() {
    const viz = this.props.visualization;
    const urls = [viz.communitiesBarplot.url, viz.communitiesTreemap.url];

    return (
      <Stack
        tokens={{ padding: 10 }}
        style={{
          backgroundColor: NeutralColors.white,
          boxShadow: Depths.depth4
        }}
      >
        <Stack.Item>
          <h2>Community Count Visualization</h2>
        </Stack.Item>
        <Stack.Item>
          <ImageGallery titles={["Barplot", "Treemap"]} urls={urls} />
        </Stack.Item>
      </Stack>
    );
  }
}
