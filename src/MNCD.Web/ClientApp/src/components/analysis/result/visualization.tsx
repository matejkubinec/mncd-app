import React from "react";
import {
  Stack,
  ITheme,
  IDropdownOption,
  Dropdown,
  Separator,
} from "office-ui-fabric-react";
import ImageGallery from "../../common/image-gallery";
import { AnalysisVisualizationViewModel } from "../../../types";
import AnalysisResultCard from "./result-card";

enum VT {
  SingleLayer = "Single Layer",
  SingleLayerCommunities = "Single Layer - Communities",
  MultiLayer = "Multi Layer",
  MultiLayerCommunities = "Multi Layer - Communities",
  CommunitySizes = "Community Sizes",
}

interface IProps {
  theme: ITheme;
  visualizations: AnalysisVisualizationViewModel;
}

interface IState {
  selected: VT;
}

export default class Visualization extends React.Component<IProps, IState> {
  private options: IDropdownOption[] = [
    { key: VT.MultiLayer, text: VT.MultiLayer },
    { key: VT.MultiLayerCommunities, text: VT.MultiLayerCommunities },
    { key: VT.SingleLayer, text: VT.SingleLayer },
    { key: VT.SingleLayerCommunities, text: VT.SingleLayerCommunities },
    { key: VT.CommunitySizes, text: VT.CommunitySizes },
  ];

  constructor(props: IProps) {
    super(props);

    this.state = {
      selected: VT.MultiLayer,
    };
  }

  render = () => (
    <AnalysisResultCard title={"Visualizations"} theme={this.props.theme}>
      {this.renderBody()}
    </AnalysisResultCard>
  );

  private renderBody = () => {
    const visualizations = this.getSelectedVisualization();
    const titles = visualizations.map((v) => v.title);
    const urls = visualizations.map((v) => v.url);

    return (
      <Stack>
        <Dropdown
          options={this.options}
          selectedKey={this.state.selected}
          onChange={(_, o) => (o ? this.handleVisualizationChange(o) : null)}
        />
        <Separator />
        <ImageGallery titles={titles} urls={urls} />
      </Stack>
    );
  };

  private handleVisualizationChange = (option: IDropdownOption) => {
    this.setState({ selected: option.key as VT });
  };

  private getSelectedVisualization = () => {
    const { visualizations } = this.props;

    switch (this.state.selected) {
      case VT.MultiLayer:
        return visualizations.multiLayer;
      case VT.MultiLayerCommunities:
        return visualizations.multiLayerCommunities;
      case VT.SingleLayer:
        return visualizations.singleLayer;
      case VT.SingleLayerCommunities:
        return visualizations.singleLayerCommunities;
      case VT.CommunitySizes:
        return visualizations.communitySizes;
    }
  };
}
