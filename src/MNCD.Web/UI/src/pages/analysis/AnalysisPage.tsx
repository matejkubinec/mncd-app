import { Page } from '@components/page';
import { useRouteAnalysis, useRouteSession } from '@hooks/route';
import { FC } from 'react';
import AnalysisActions from './components/AnalysisActions';
import AnalysisDetail from './components/AnalysisDetail';

export const AnalysisPage: FC = () => {
  const analysis = useRouteAnalysis('analysisId');
  const session = useRouteSession('sessionId');

  return (
    <Page
      title={analysis ? `Analysis ${analysis.data?.id}` : undefined}
      loading={session.isLoading || analysis.isLoading}
      backTo={`/sessions/${session.data?.id}`}
      right={
        analysis.data ? <AnalysisActions analysis={analysis.data} /> : undefined
      }
    >
      {analysis.data && <AnalysisDetail analysis={analysis.data} />}
    </Page>
  );
};
