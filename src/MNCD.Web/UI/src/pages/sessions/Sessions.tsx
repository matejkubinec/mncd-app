import { FC } from 'react';
import { useSessions } from '../../hooks/api/session';
import { Table } from '../../components/table';
import { LinkButton } from '../../components/button';
import { Stack } from '../../components/stack';
import { Page } from '../../components/page';

export const Sessions: FC = () => {
  const { data, isLoading } = useSessions();

  return (
    <Page title='Sessions'>
      {isLoading ? (
        <p>Loading ...</p>
      ) : !data ? (
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
              name: 'Create Date',
              cell: ({ createDate }) => new Date(createDate).toLocaleString(),
            },
            {
              id: 'analyses',
              field: 'analysesCount',
              name: 'Analyses',
            },
          ]}
        />
      )}
      <Stack direction='row' justify='flex-end'>
        <LinkButton to='/sessions/add'>Add Session</LinkButton>
      </Stack>
    </Page>
  );
};
