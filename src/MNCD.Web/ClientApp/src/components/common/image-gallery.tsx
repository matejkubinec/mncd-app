import React from "react";
import { Stack, Image, IconButton, ImageFit } from "office-ui-fabric-react";

interface IProps {
  titles: string[];
  urls: string[];
}

interface IState {
  currentIdx: number;
}

export default class ImageGallery extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      currentIdx: 0
    };
  }

  next = () => {
    if (this.state.currentIdx + 1 < this.props.urls.length) {
      this.setState({ currentIdx: this.state.currentIdx + 1 });
    }
  };

  prev = () => {
    if (this.state.currentIdx - 1 >= 0) {
      this.setState({ currentIdx: this.state.currentIdx - 1 });
    }
  };

  render() {
    const showPrev = this.state.currentIdx > 0;
    const showNext = this.state.currentIdx + 1 < this.props.urls.length;

    return (
      <Stack tokens={{ childrenGap: 10 }}>
        <Stack.Item>
          <h4>{this.props.titles[this.state.currentIdx]}</h4>
        </Stack.Item>
        <Stack
          horizontal
          horizontalAlign="space-between"
          style={{ height: 400 }}
        >
          <Stack.Item styles={{ root: { width: 50 } }}>
            {showPrev ? (
              <IconButton
                style={{ height: "100%" }}
                iconProps={{ iconName: "ChevronLeft" }}
                onClick={this.prev}
              />
            ) : null}
          </Stack.Item>
          <Stack.Item grow={2}>
            <Image
              styles={{ root: { height: "100%", borderRadius: 4 } }}
              imageFit={ImageFit.centerContain}
              src={this.props.urls[this.state.currentIdx]}
            />
          </Stack.Item>
          <Stack.Item styles={{ root: { width: 50 } }}>
            {showNext ? (
              <IconButton
                style={{ height: "100%" }}
                iconProps={{ iconName: "ChevronRight" }}
                onClick={this.next}
              />
            ) : null}
          </Stack.Item>
        </Stack>
      </Stack>
    );
  }
}
