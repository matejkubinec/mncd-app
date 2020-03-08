import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../store";
import { Stack, IconButton, getTheme } from "office-ui-fabric-react";
import { push } from "connected-react-router";
const theme = getTheme();

class AnalysisPage extends React.Component<ReduxProps> {
  handleBackToSessionListClick = () => {
    this.props.push("/");
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
            backgroundColor: theme.palette.accent,
            color: theme.palette.white
          }
        }}
      >
        <Stack.Item>
          <IconButton
            iconProps={{ iconName: "Back" }}
            styles={{ root: { color: theme.palette.white } }}
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
  session: rootState.analysis.session
});

const mapDispatch = { push };

const connector = connect(mapProps, mapDispatch);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(AnalysisPage);
