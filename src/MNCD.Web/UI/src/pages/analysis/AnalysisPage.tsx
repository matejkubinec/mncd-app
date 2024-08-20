import { Page } from '@components/page';
import { useRouteAnalysis, useRouteSession } from '@hooks/route';
import { FC } from 'react';

export const AnalysisPage: FC = () => {
  const analysis = useRouteAnalysis('analysisId');
  const session = useRouteSession('sessionId');

  return (
    <Page
      title={analysis ? `Analysis ${analysis.data?.id}` : undefined}
      loading={session.isLoading || analysis.isLoading}
      backTo={`/sessions/${session.data?.id}`}
    >
      WIP
    </Page>
  );
};
