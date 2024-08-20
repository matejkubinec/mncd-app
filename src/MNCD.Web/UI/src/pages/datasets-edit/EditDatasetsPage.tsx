import { Page } from '@components/page';
import { useRouteDataset } from '@hooks/route';
import { FC } from 'react';

export const EditDatasetPage: FC = () => {
  const { data: dataset } = useRouteDataset();

  return (
    <Page
      title={dataset?.name ? `Edit ${dataset.name}` : undefined}
      backTo='/datasets'
    >
      WIP
    </Page>
  );
};
