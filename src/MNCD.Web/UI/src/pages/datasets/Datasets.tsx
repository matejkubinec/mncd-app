import { LinkButton } from '@components/button';
import { Page } from '@components/page';
import { Stack } from '@components/stack';
import { Table } from '@components/table';
import { useDatasets } from '@hooks/api/dataset';
import { FC } from 'react';
import { DatasetsActions } from './datasets-actions';

export const DatasetsPage: FC = () => {
  const datasets = useDatasets();

  return (
    <Page title='Datasets'>
      {datasets.isLoading ? (
        <p>Loading ...</p>
      ) : !datasets.data?.length ? (
        <p>No datasets to show</p>
      ) : (
        <Table
          rowId='id'
          rows={datasets.data}
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
      <Stack flexDirection='row' justifyContent='flex-end'>
        <LinkButton to='/datasets/add'>Add Dataset</LinkButton>
      </Stack>
    </Page>
  );
};
