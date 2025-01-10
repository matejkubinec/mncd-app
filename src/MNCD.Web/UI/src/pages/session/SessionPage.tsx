import { Page } from '@components/page';
import { Table } from '@components/table';
import { useRouteSession } from '@hooks/route';
import { ANALYSIS_ALGORITHM_NAME, APPROACH_NAME } from '@lib/constants';
import { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AnalysisActions from './components/AnalysisActions';
import AnalysisComparison from './components/AnalysisComparison';

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
        <Button variant='contained' onClick={addAnalysis}>
          Analyze
        </Button>
      }
    >
      <Typography variant='subtitle1'>Analyses</Typography>
      {session?.analyses.length ? (
        <>
          <Table
            rowId='id'
            rows={session?.analyses || []}
            onRowClick={({ id }) =>
              navigate(`/session/${session?.id}/analysis/${id}`)
            }
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
                cell: ({ request: { selectedLayerName } }) =>
                  selectedLayerName ?? '',
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
          {session?.analyses.length > 1 && (
            <AnalysisComparison analyzes={session?.analyses || []} />
          )}
        </>
      ) : (
        <Typography variant='body2'>
          No analyses yet, please analyze a dataset first
        </Typography>
      )}
    </Page>
  );
};
