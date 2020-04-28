import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../store";
import {
  Stack,
  Dropdown,
  IDropdownOption,
  Separator,
} from "office-ui-fabric-react";
import { AnalysisResultItem } from ".";
import { setLeftSide, setRightSide } from "../../slices/analysis-slice";

class AnalysisSideBySide extends React.Component<ReduxProps> {
  render() {
    const { analyses, theme, index1, index2 } = this.props;

    if (!analyses.length) {
      return null;
    }

    const options: IDropdownOption[] = analyses.map((a) => ({
      key: a.id,
      text: "Analysis " + a.id,
    }));

    const cardStyle = {
      width: "50%",
      padding: 5,
      margin: 15,
      borderRadius: theme.effects.roundedCorner2,
      boxShadow: theme.effects.elevation16,
      background: theme.palette.white,
    };

    const opt1 = options.map((o, i) => ({ ...o, selected: i === index1 }));
    const opt2 = options.map((o, i) => ({ ...o, selected: i === index2 }));
    const item1 = analyses[index1];
    const item2 = analyses[index2];

    console.log(analyses, item1, item2, index1, index2);

    return (
      <Stack horizontal horizontalAlign="space-evenly">
        <Stack style={cardStyle}>
          <Stack>
            <Stack.Item>
              <Dropdown
                dropdownWidth={250}
                options={opt1}
                onChange={this.handleLeftChange}
              />
            </Stack.Item>
            <Stack.Item>
              <Separator />
            </Stack.Item>
            <Stack.Item>
              <AnalysisResultItem analysis={item1} theme={theme} />
            </Stack.Item>
          </Stack>
        </Stack>
        <Stack style={cardStyle}>
          <Stack>
            <Stack.Item>
              <Dropdown
                dropdownWidth={250}
                options={opt2}
                onChange={this.handleRightChange}
              />
            </Stack.Item>
            <Stack.Item>
              <Separator />
            </Stack.Item>
            <Stack.Item>
              <AnalysisResultItem analysis={item2} theme={theme} />
            </Stack.Item>
          </Stack>
        </Stack>
      </Stack>
    );
  }

  private handleLeftChange = (_: any, __: any, idx?: number) => {
    if (idx) {
      this.props.setLeftSide(idx);
    }
  };

  private handleRightChange = (_: any, __: any, idx?: number) => {
    if (idx) {
      this.props.setRightSide(idx);
    }
  };
}

const mapProps = (rootState: RootState) => {
  const { session, sideBySide } = rootState.analysis;
  const analyses = session ? session.analyses : [];
  return {
    theme: rootState.theme.current,
    analyses,
    ...sideBySide,
  };
};

const mapDispatch = { setLeftSide, setRightSide };

const connector = connect(mapProps, mapDispatch);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(AnalysisSideBySide);
