import { LinkButton } from '@components/button';
import { Page } from '@components/page';
import { Stack } from '@components/stack';
import { Table } from '@components/table';
import { useDatasets } from '@hooks/api/dataset';
import { FC } from 'react';

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
              name: 'Node Count',
            },
            {
              id: 'edgeCount',
              field: 'edgeCount',
              name: 'Edge Count',
            },
            {
              id: 'layerCount',
              field: 'layerCount',
              name: 'Layer Count',
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
