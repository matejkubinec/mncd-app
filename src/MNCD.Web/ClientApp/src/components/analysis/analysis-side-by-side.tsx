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
    const { s1, m } = theme.spacing;

    if (!analyses.length) {
      return null;
    }

    const options: IDropdownOption[] = analyses.map((a, i) => ({
      key: i,
      text: "Analysis " + a.id,
    }));

    const cardStyle = {
      width: "50%",
      padding: s1,
      margin: m,
      borderRadius: theme.effects.roundedCorner2,
      boxShadow: theme.effects.elevation16,
      background: theme.palette.neutralLighter,
    };

    const opt1 = options.map((o, i) => ({ ...o, selected: i === index1 }));
    const opt2 = options.map((o, i) => ({ ...o, selected: i === index2 }));
    const item1 = analyses[index1];
    const item2 = analyses[index2];

    return (
      <Stack horizontal horizontalAlign="space-evenly">
        <Stack style={cardStyle}>
          <Stack>
            <Stack tokens={{ padding: s1 }}>
              <Dropdown
                dropdownWidth={250}
                options={opt1}
                onChanged={this.handleLeftChange}
              />
            </Stack>
            <AnalysisResultItem
              analysis={item1}
              theme={theme}
              showControls={false}
            />
          </Stack>
        </Stack>
        <Stack style={cardStyle}>
          <Stack>
            <Stack tokens={{ padding: s1 }}>
              <Dropdown
                dropdownWidth={250}
                options={opt2}
                onChanged={this.handleRightChange}
              />
            </Stack>
            <AnalysisResultItem
              analysis={item2}
              theme={theme}
              showControls={false}
            />
          </Stack>
        </Stack>
      </Stack>
    );
  }

  private handleLeftChange = (option: IDropdownOption) => {
    this.props.setLeftSide(Number(option.key));
  };

  private handleRightChange = (option: IDropdownOption) => {
    this.props.setRightSide(Number(option.key));
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
