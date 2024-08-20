import { Button } from '@components/button';
import { Page } from '@components/page';
import { Stack } from '@components/stack';
import { Table } from '@components/table';
import { useRouteSession } from '@hooks/route';
import { ANALYSIS_ALGORITHM_NAME, APPROACH_NAME } from '@lib/constants';
import { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnalysisActions } from './analysis-actions';

export const SessionPage: FC = () => {
  const { data: session, isLoading } = useRouteSession();
  const navigate = useNavigate();

  const addAnalysis = useCallback(() => {
    navigate(`/sessions/${session?.id}/analyze`);
  }, [session, navigate]);

  return (
    <Page
      title={session?.name}
      loading={isLoading}
      backTo='/'
      right={
        <Stack>
          <Button onClick={addAnalysis}>Analyze</Button>
        </Stack>
      }
    >
      <h3>Analyses</h3>
      <Table
        rowId='id'
        rows={session?.analyses || []}
        columns={[
          {
            id: 'id',
            name: 'Analysis',
            cell: ({ id }) => 'Analysis ' + id,
          },
          {
            id: 'approach',
            name: 'Approach',
            cell: ({ request: { approach } }) => APPROACH_NAME[approach],
          },
          {
            id: 'dataset',
            name: 'Dataset',
            cell: ({ request: { dataSetName } }) => dataSetName,
          },
          {
            id: 'layer',
            name: 'Layer',
            cell: ({ request: { selectedLayerName } }) => selectedLayerName,
          },
          {
            id: 'algorithm',
            name: 'Algorithm',
            cell: ({ request: { analysisAlgorithm } }) =>
              ANALYSIS_ALGORITHM_NAME[analysisAlgorithm],
          },
          {
            id: 'actions',
            cell: (analysis) => (
              <AnalysisActions session={session!} analysis={analysis} />
            ),
          },
        ]}
      />
    </Page>
  );
};
