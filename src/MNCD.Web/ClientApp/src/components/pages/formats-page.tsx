import React from "react";
import {
  Stack,
  IStackSlots,
  Image,
  VerticalDivider,
  Separator,
} from "office-ui-fabric-react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../store";
import { IComponentStyles } from "office-ui-fabric-react/lib/Foundation";

class FormatsPage extends React.Component<ReduxProps> {
  private codeStyle: IComponentStyles<IStackSlots> = {
    root: {
      backgroundColor: this.props.theme.palette.neutralLight,
      borderRadius: this.props.theme.effects.roundedCorner2,
      boxShadow: this.props.theme.effects.elevation4,
    },
  };

  renderExampleMPX = () => {
    const mpx = `
        #TYPE multiplex
        #LAYERS
        Layer1,UNDIRECTED
        Layer2,UNDIRECTED
        #ACTORS
        Actor1
        Actor2
        #EDGES
        Actor1,Actor2,Layer1,1
        Actor1,Actor2,Layer2,1
    `;

    return mpx
      .trim()
      .split("\n")
      .map((row) => (
        <Stack horizontal tokens={{ childrenGap: 10 }}>
          <Stack.Item>{row.trim()}</Stack.Item>
        </Stack>
      ));
  };

  renderExampleEdgeList = () => {
    const edgelist = `0 0 1 0 1
        0 1 1 1 1
        0 0 1 1 1
        # Actors
        0 Actor0
        1 Actor1
        # Layers
        0 Layer0
        1 Layer1
    `;

    return edgelist.split("\n").map((row) => (
      <Stack horizontal tokens={{ childrenGap: 10 }}>
        {row
          .trim()
          .split(" ")
          .map((cell) => (
            <Stack.Item>{cell}</Stack.Item>
          ))}
      </Stack>
    ));
  };

  render = () => {
    const { theme } = this.props;
    const { s1, m, l2 } = theme.spacing;

    return (
      <div style={{ padding: m }}>
        <Stack
          tokens={{ padding: m, childrenGap: s1 }}
          styles={{
            root: {
              background: theme.semanticColors.bodyBackground,
              boxShadow: theme.effects.elevation4,
            },
          }}
        >
          <Stack.Item>
            <h1>Supported Formats</h1>
          </Stack.Item>
          <Separator />
          <Stack horizontal tokens={{ childrenGap: l2 }}>
            <Stack.Item grow={1}>
              <Stack>
                <Stack.Item>
                  <Stack tokens={{ childrenGap: 10 }}>
                    <Stack.Item>
                      <h2>Edge List</h2>
                    </Stack.Item>
                    <Stack.Item>
                      Data in edgelist format need to be supplied in following
                      format:
                    </Stack.Item>
                    <Stack.Item>
                      <Stack
                        horizontal
                        tokens={{ padding: s1, childrenGap: s1 }}
                        styles={this.codeStyle}
                      >
                        <Stack.Item>actor_from</Stack.Item>
                        <Stack.Item>layer_from</Stack.Item>
                        <Stack.Item>actor_to </Stack.Item>
                        <Stack.Item>layer_to</Stack.Item>
                        <Stack.Item>edge_weight</Stack.Item>
                      </Stack>
                    </Stack.Item>
                    <Stack.Item>
                      File can also include metadata after the edgelist in
                      following format:
                    </Stack.Item>
                    <Stack.Item>
                      <Stack
                        tokens={{ padding: s1, childrenGap: s1 }}
                        styles={this.codeStyle}
                      >
                        <Stack>
                          <Stack.Item># Actors</Stack.Item>
                        </Stack>
                        <Stack horizontal tokens={{ childrenGap: s1 }}>
                          <Stack.Item>actor_index</Stack.Item>
                          <Stack.Item>actor_name</Stack.Item>
                        </Stack>
                        <Stack>...</Stack>
                        <Stack>
                          <Stack.Item># Layers</Stack.Item>
                        </Stack>
                        <Stack horizontal tokens={{ childrenGap: s1 }}>
                          <Stack.Item>layer_index</Stack.Item>
                          <Stack.Item>layer_name</Stack.Item>
                        </Stack>
                        <Stack>...</Stack>
                      </Stack>
                    </Stack.Item>
                    <Stack.Item>
                      <h3>Example</h3>
                    </Stack.Item>

                    <Stack.Item>
                      <Stack
                        tokens={{ padding: s1, childrenGap: s1 }}
                        styles={this.codeStyle}
                      >
                        {this.renderExampleEdgeList()}
                      </Stack>
                    </Stack.Item>
                    <Stack.Item>
                      <Image width="150" src="/images/edgelist-example.svg" />
                    </Stack.Item>
                  </Stack>
                </Stack.Item>
              </Stack>
            </Stack.Item>
            <Stack.Item>
              <VerticalDivider />
            </Stack.Item>
            <Stack.Item grow={1}>
              <Stack tokens={{ childrenGap: s1 }}>
                <Stack.Item>
                  <h2>MPX</h2>
                </Stack.Item>
                <Stack.Item>
                  More info on this format{" "}
                  <a href="https://rdrr.io/cran/multinet/man/IO.html">here.</a>
                </Stack.Item>
                <Stack.Item>
                  <h3>Example</h3>
                </Stack.Item>
                <Stack.Item>
                  <Stack
                    tokens={{ padding: s1, childrenGap: s1 }}
                    styles={this.codeStyle}
                  >
                    {this.renderExampleMPX()}
                  </Stack>
                </Stack.Item>
                <Stack.Item>
                  <Image width="150" src="/images/mpx-example.svg" />
                </Stack.Item>
              </Stack>
            </Stack.Item>
          </Stack>
        </Stack>
      </div>
    );
  };
}

const mapProps = (state: RootState) => ({
  theme: state.theme.current,
});

const mapDispatch = {};

const connector = connect(mapProps, mapDispatch);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(FormatsPage);
