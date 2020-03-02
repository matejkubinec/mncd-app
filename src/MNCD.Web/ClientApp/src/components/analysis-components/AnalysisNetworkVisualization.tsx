import React from "react";
import { Stack, Image, IconButton } from "office-ui-fabric-react";
import { NeutralColors } from "@uifabric/fluent-theme/lib/fluent/FluentColors";
import { Depths } from "@uifabric/fluent-theme/lib/fluent/FluentDepths";
import ImageGallery from "../common/ImageGallery";

interface IProps {
  header: string;
  titles: string[];
  urls: string[];
}

interface IState {}

export default class AnalysisNetworkVisualization extends React.Component<
  IProps,
  IState
> {
  render() {
    return (
      <Stack
        tokens={{ padding: 10 }}
        style={{
          backgroundColor: NeutralColors.white,
          boxShadow: Depths.depth4
        }}
      >
        <Stack.Item>
          <h2>{this.props.header}</h2>
        </Stack.Item>
        <Stack.Item>
          <ImageGallery titles={this.props.titles} urls={this.props.urls} />
        </Stack.Item>
      </Stack>
    );
  }
}
