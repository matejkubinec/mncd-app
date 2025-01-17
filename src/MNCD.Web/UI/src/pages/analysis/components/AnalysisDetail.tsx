import { Analysis } from '@lib/types/analysis';
import Stack from '@mui/material/Stack';
import { FC } from 'react';
import Request from './Request';
import Evaluation from './Evaluation';
import CommunityDetails from './CommunityDetails';
import Visualizations from './Visualizations';
import Notes from './Notes';

interface Props {
  analysis: Analysis;
}

const AnalysisDetail: FC<Props> = ({ analysis }) => {
  const visualization = analysis.visualization;
  const request = analysis.request;
  const result = analysis.result;

  return (
    <Stack gap={2}>
      {request && (
        <>
          <Request {...request} />
        </>
      )}

      {result && (
        <>
          <Evaluation {...result} />
          <CommunityDetails {...result} />
        </>
      )}
      {visualization && <Visualizations visualizations={visualization} />}
      <Notes analysisId={analysis.id} notes={analysis.notes || ''} />
    </Stack>
  );
};

export default AnalysisDetail;
