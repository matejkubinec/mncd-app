import React from "react";
import { Stack, Spinner, SpinnerSize } from "office-ui-fabric-react";
import { NeutralColors } from "@uifabric/fluent-theme/lib/fluent/FluentColors";
import { Depths } from "@uifabric/fluent-theme/lib/fluent/FluentDepths";
import ImageGallery from "../../common/ImageGallery";

interface IProps {
  header: string;
  titles: string[];
  urls: string[];
  isLoading: boolean;
}

interface IState {}

export default class Visualization extends React.Component<IProps, IState> {
  render() {
    return (
      <Stack
        tokens={{ padding: 10, childrenGap: 5 }}
        style={{
          backgroundColor: NeutralColors.white,
          boxShadow: Depths.depth4
        }}
      >
        <Stack.Item>
          <h2>{this.props.header}</h2>
        </Stack.Item>
        <Stack.Item>
          {this.props.isLoading ? (
            <Spinner styles={{ circle: { width: 200, height: 200 } }} />
          ) : this.props.urls.length !== 0 ? (
            <ImageGallery titles={this.props.titles} urls={this.props.urls} />
          ) : null}
        </Stack.Item>
      </Stack>
    );
  }
}
