import { Page } from '@components/page';
import { useRouteAnalysis, useRouteSession } from '@hooks/route';
import { FC } from 'react';
import Request from './components/Request';
import Evaluation from './components/Evaluation';
import CommunityDetails from './components/CommunityDetails';
import Notes from './components/Notes';
import Visualizations from './components/Visualizations';
import AnalysisActions from './components/AnalysisActions';
import Stack from '@mui/material/Stack';

export const AnalysisPage: FC = () => {
  const analysis = useRouteAnalysis('analysisId');
  const session = useRouteSession('sessionId');
  const visualization = analysis.data?.visualization;
  const request = analysis.data?.request;
  const result = analysis.data?.result;

  return (
    <Page
      title={analysis ? `Analysis ${analysis.data?.id}` : undefined}
      loading={session.isLoading || analysis.isLoading}
      backTo={`/sessions/${session.data?.id}`}
      right={
        analysis.data ? <AnalysisActions analysis={analysis.data} /> : undefined
      }
    >
      <Stack gap={2}>
        {request && (
          <>
            <Request {...request} />
          </>
        )}

        {result && (
          <>
            <Evaluation {...result} />
            <CommunityDetails {...result} />
          </>
        )}
        {visualization && <Visualizations visualizations={visualization} />}
        {analysis.data && (
          <Notes
            analysisId={analysis.data.id}
            notes={analysis.data.notes || ''}
          />
        )}
      </Stack>
    </Page>
  );
};
