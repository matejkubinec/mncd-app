import { Page } from '@components/page';
import { useRouteSession } from '@hooks/route/session';
import { FC } from 'react';

export const EditSessionPage: FC = () => {
  const session = useRouteSession();

  return (
    <Page title={session.data ? `Editing ${session.data.name}` : ''}>WIP</Page>
  );
};
