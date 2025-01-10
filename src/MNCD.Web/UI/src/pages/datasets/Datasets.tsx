import { Page } from '@components/page';
import { Table } from '@components/table';
import { useDatasets } from '@hooks/api/dataset';
import { FC } from 'react';
import { DatasetsActions } from './datasets-actions';
import { LinkButton } from '@components/link-button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

export const DatasetsPage: FC = () => {
  const datasets = useDatasets();
  const navigate = useNavigate();

  return (
    <Page
      title='Datasets'
      loading={datasets.isLoading}
      right={
        <LinkButton variant='contained' to='/datasets/add'>
          Add Dataset
        </LinkButton>
      }
    >
      {!datasets.data?.length ? (
        <Typography variant='body2'>
          No datasets to show, please add one first
        </Typography>
      ) : (
        <Table
          rowId='id'
          rows={datasets.data}
          onRowClick={({ id }) => navigate(`/datasets/${id}`)}
          columns={[
            {
              id: 'name',
              field: 'name',
              name: 'Name',
            },
            {
              id: 'nodeCount',
              field: 'nodeCount',
              name: 'Nodes',
            },
            {
              id: 'edgeCount',
              field: 'edgeCount',
              name: 'Edges',
            },
            {
              id: 'layerCount',
              field: 'layerCount',
              name: 'Layers',
            },
            {
              id: 'actions',
              cell: (dataset) => <DatasetsActions dataset={dataset} />,
            },
          ]}
        />
      )}
    </Page>
  );
};
