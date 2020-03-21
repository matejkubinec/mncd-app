import React from "react";
import { Stack, Spinner } from "office-ui-fabric-react";
import ImageGallery from "../../common/image-gallery";

interface IProps {
  header: string;
  titles: string[];
  urls: string[];
}

export default class Visualization extends React.Component<IProps> {
  render() {
    return (
      <Stack tokens={{ padding: 10, childrenGap: 5 }}>
        <Stack.Item>
          <h2>{this.props.header}</h2>
        </Stack.Item>
        <Stack.Item>
          {this.props.urls.length !== 0 ? (
            <ImageGallery titles={this.props.titles} urls={this.props.urls} />
          ) : null}
        </Stack.Item>
      </Stack>
    );
  }
}
