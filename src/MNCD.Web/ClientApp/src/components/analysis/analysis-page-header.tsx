import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState, history } from "../../store";
import { Stack, IconButton } from "office-ui-fabric-react";

class AnalysisPage extends React.Component<ReduxProps> {
  handleBackToSessionListClick = () => {
    history.push("/");
  };

  render() {
    return (
      <Stack
        horizontal
        verticalAlign="center"
        tokens={{ childrenGap: 5 }}
        styles={{
          root: {
            position: "relative",
            zIndex: 10,
            backgroundColor: this.props.theme.palette.accent,
            color: this.props.theme.palette.white,
          },
        }}
      >
        <Stack.Item>
          <IconButton
            iconProps={{ iconName: "Back" }}
            styles={{ root: { color: this.props.theme.palette.white } }}
            onClick={this.handleBackToSessionListClick}
          />
        </Stack.Item>
        {this.props.session ? (
          <React.Fragment>
            <Stack.Item>
              <h3>{this.props.session.name}</h3>
            </Stack.Item>
            <Stack.Item>
              ({new Date(this.props.session.createDate).toLocaleString()})
            </Stack.Item>
          </React.Fragment>
        ) : null}
      </Stack>
    );
  }
}

const mapProps = (rootState: RootState) => ({
  theme: rootState.theme.current,
  session: rootState.analysis.session,
});

const mapDispatch = {};

const connector = connect(mapProps, mapDispatch);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(AnalysisPage);
