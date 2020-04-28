import React from "react";
import {
  Stack,
  Image,
  IconButton,
  ImageFit,
  ImageLoadState,
  Spinner,
  SpinnerSize,
  Text,
} from "office-ui-fabric-react";

interface IProps {
  titles: string[];
  urls: string[];
  height: number;
  useMaxHeight: boolean;
}

interface IState {
  currentIdx: number;
}

export default class ImageGallery extends React.Component<IProps, IState> {
  public static defaultProps = {
    height: 750,
    useMaxHeight: false,
  };

  constructor(props: IProps) {
    super(props);

    this.state = {
      currentIdx: 0,
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
      <Stack
        tokens={{ childrenGap: 10 }}
        style={{ height: this.props.useMaxHeight ? "100%" : this.props.height }}
      >
        <Stack.Item>
          <span style={{ fontWeight: 600 }}>{title}</span>
        </Stack.Item>
        <Stack
          horizontal
          horizontalAlign="space-between"
          style={{
            height: this.props.useMaxHeight ? "100%" : this.props.height,
          }}
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
      isLoading: true,
      isError: false,
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
        <Text variant="xLargePlus">
          <span role="img" aria-labelledby="Error loading image">
            ❌
          </span>
        </Text>
        <Text>There was an error loading the image.</Text>
      </Stack>
    );
  };

  renderLoading = () => {
    return (
      <Stack verticalFill verticalAlign="center" horizontalAlign="center">
        <Spinner size={SpinnerSize.large} />
        <Text>Loading ...</Text>
      </Stack>
    );
  };

  render() {
    const { isLoading, isError } = this.state;
    const display = isLoading || isError ? "none" : "unset";

    return (
      <Stack verticalFill verticalAlign="center">
        {isError ? this.renderError() : null}
        {isLoading ? this.renderLoading() : null}
        <Image
          styles={{ root: { height: "100%", borderRadius: 2, display } }}
          imageFit={ImageFit.centerContain}
          src={this.props.src}
          onLoadingStateChange={this.handleLoadingStateChange}
        />
      </Stack>
    );
  }
}
