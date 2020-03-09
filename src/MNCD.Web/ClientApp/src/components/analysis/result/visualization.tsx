import React from "react";
import { Stack, Spinner } from "office-ui-fabric-react";
import ImageGallery from "../../common/image-gallery";

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
      <Stack tokens={{ padding: 10, childrenGap: 5 }}>
        <Stack.Item>
          <h2>{this.props.header}</h2>
        </Stack.Item>
        <Stack.Item>
          {this.props.isLoading ? (
            <Spinner
              styles={{ circle: { width: 150, height: 150, margin: 50 } }}
            />
          ) : this.props.urls.length !== 0 ? (
            <ImageGallery titles={this.props.titles} urls={this.props.urls} />
          ) : null}
        </Stack.Item>
      </Stack>
    );
  }
}
