import React from "react";
import {
  Stack,
  Image,
  IconButton,
  ImageFit,
  ImageLoadState,
  Spinner,
  SpinnerSize,
  Text
} from "office-ui-fabric-react";

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
    const title = this.props.titles[this.state.currentIdx];
    const src = this.props.urls[this.state.currentIdx];

    return (
      <Stack tokens={{ childrenGap: 10 }}>
        <Stack.Item>
          <span style={{ fontWeight: 600 }}>{title}</span>
        </Stack.Item>
        <Stack
          horizontal
          horizontalAlign="space-between"
          style={{ height: 750 }}
        >
          <Stack.Item styles={{ root: { width: 50 } }}>
            {showPrev ? (
              <IconButton
                style={{ height: "100%" }}
                iconProps={{ iconName: "ChevronLeft" }}
                onClick={this.prev}
              />
            ) : (
              " "
            )}
          </Stack.Item>
          <Stack.Item grow={2} verticalFill>
            <ImageContainer src={src} />
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

interface ICProps {
  src: string;
}

interface ICState {
  isLoading: boolean;
  isError: boolean;
}

class ImageContainer extends React.Component<ICProps, ICState> {
  constructor(props: ICProps) {
    super(props);
    this.state = {
      isLoading: false,
      isError: false
    };
  }

  handleLoadingStateChange = (loadState: ImageLoadState) => {
    if (loadState === ImageLoadState.notLoaded) {
      this.setState({ isLoading: true });
    }

    if (loadState === ImageLoadState.error) {
      this.setState({ isLoading: false, isError: true });
    }

    if (loadState === ImageLoadState.loaded) {
      this.setState({ isLoading: false });
    }
  };

  renderError = () => {
    return (
      <Stack verticalFill verticalAlign="center" horizontalAlign="center">
        <Text variant="xLargePlus">❌</Text>
        <Text>There was an error loading the image.</Text>
      </Stack>
    );
  };

  render() {
    const display = this.state.isLoading ? "none" : "unset";

    return (
      <Stack verticalFill verticalAlign="center">
        {this.state.isError ? this.renderError() : null}
        {this.state.isLoading ? <Spinner size={SpinnerSize.large} /> : null}
        <Image
          styles={{ root: { height: "100%", borderRadius: 4, display } }}
          imageFit={ImageFit.centerContain}
          src={this.props.src}
          onLoadingStateChange={this.handleLoadingStateChange}
        />
      </Stack>
    );
  }
}
