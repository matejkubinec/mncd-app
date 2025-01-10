import { Page } from '@components/page';
import { Table } from '@components/table';
import { useSessions } from '@hooks/api/session';
import { FC } from 'react';
import { SessionActions } from './sessions-actions/SessionActions';
import { useNavigate } from 'react-router-dom';
import { LinkButton } from '@components/link-button';
import Typography from '@mui/material/Typography';

export const SessionsPage: FC = () => {
  const { data, isLoading } = useSessions();
  const navigate = useNavigate();

  return (
    <Page
      title='Sessions'
      loading={isLoading}
      right={
        <LinkButton to='/sessions/add' variant='contained'>
          Add Session
        </LinkButton>
      }
    >
      {!data?.length ? (
        <Typography variant='body2'>
          No sessions to show, please add one first
        </Typography>
      ) : (
        <Table
          rowId='id'
          rows={data}
          onRowClick={({ id }) => navigate(`/sessions/${id}`)}
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
    </Page>
  );
};
