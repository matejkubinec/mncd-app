import { LinkButton } from '@components/button';
import { Page } from '@components/page';
import { Stack } from '@components/stack';
import { Table } from '@components/table';
import { useSessions } from '@hooks/api/session';
import { FC } from 'react';
import { SessionActions } from './sessions-actions/SessionActions';

export const SessionsPage: FC = () => {
  const { data, isLoading } = useSessions();

  return (
    <Page title='Sessions' loading={isLoading}>
      {!data?.length ? (
        <p>No sessions yet</p>
      ) : (
        <Table
          rowId='id'
          rows={data}
          columns={[
            {
              id: 'name',
              field: 'name',
              name: 'Name',
            },
            {
              id: 'createdate',
              field: 'createDate',
              name: 'Created',
              cell: ({ createDate }) => new Date(createDate).toLocaleString(),
            },
            {
              id: 'analyses',
              field: 'analysesCount',
              name: 'Analyses',
            },
            {
              id: 'actions',
              align: 'right',
              width: 100,
              cell: (row) => <SessionActions session={row} />,
            },
          ]}
        />
      )}
      <Stack flexDirection='row' justifyContent='flex-end'>
        <LinkButton to='/sessions/add'>Add Session</LinkButton>
      </Stack>
    </Page>
  );
};
