import React, { Component } from "react";
import { Route, Switch } from "react-router";
import { SessionList } from "./components/sessions";
import AnalysisPage from "./components/AnalysisPage";
import { DataSetsModal } from "./components/dataset";

const testData = {
  request: {
    id: 1,
    sessionId: 0,
    datasetId: 1,
    selectedLayer: 0,
    approach: 1,
    analysisAlgorithm: 0,
    analysisAlgorithmParameters: {
      k: "3",
      maxIterations: "101"
    },
    flattenningAlgorithm: 0,
    flattenningAlgorithmParameters: {}
  },
  result: {
    id: 1,
    averageVariety: 0,
    varieties: [],
    averageExclusivity: 0,
    exclusivities: [],
    averageHomogenity: 0,
    homogenities: [],
    coverage: 0.3,
    performance: 0.3
  },
  visualization: {
    multiLayer: [
      {
        title: "Diagonal Layout",
        url: "api/visualization/3"
      }
    ],
    multiLayerCommunities: [
      {
        title: "Hairball Layout",
        url: "api/visualization/4"
      }
    ],
    singleLayer: [
      {
        title: "Circular Layout",
        url: "api/visualization/5"
      },
      {
        title: "Spiral Layout",
        url: "api/visualization/6"
      },
      {
        title: "Spring Layout",
        url: "api/visualization/7"
      }
    ],
    singleLayerCommunities: [
      {
        title: "Circular Layout",
        url: "api/visualization/8"
      },
      {
        title: "Spiral Layout",
        url: "api/visualization/9"
      },
      {
        title: "Spring Layout",
        url: "api/visualization/10"
      }
    ],
    communitiesBarplot: {
      title: null,
      url: "api/visualization/1"
    },
    communitiesTreemap: {
      title: null,
      url: "api/visualization/2"
    }
  }
};

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Switch>
        <Route exact path="/" component={SessionList} />
        <Route path="/session/:guid" component={AnalysisPage} />
      </Switch>
    );
  }
}
