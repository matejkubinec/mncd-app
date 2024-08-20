import { Page } from '@components/page';
import { useRouteSession } from '@hooks/route';
import { FC } from 'react';

export const SessionAnalysis: FC = () => {
  const { data: session, isLoading } = useRouteSession();
  return (
    <Page
      title='Analyze'
      backTo={`/sessions/${session?.id}`}
      loading={isLoading}
    >
      WIP
    </Page>
  );
};
