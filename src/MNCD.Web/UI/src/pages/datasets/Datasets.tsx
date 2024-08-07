import { FC } from 'react';
import { Page } from '../../components/page';
import { useDatasets } from '../../hooks/api/dataset';
import { Table } from '../../components/table';
import { Stack } from '../../components/stack';
import { Button, LinkButton } from '../../components/button';

export const Datasets: FC = () => {
  const { data, isLoading } = useDatasets();

  return (
    <Page title='Datasets'>
      {isLoading ? (
        <p>Loading ...</p>
      ) : !data?.length ? (
        <p>No datasets to show</p>
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
      <Stack direction='row' justify='flex-end'>
        <LinkButton to='/datasets/add'>Add Dataset</LinkButton>
      </Stack>
    </Page>
  );
};
