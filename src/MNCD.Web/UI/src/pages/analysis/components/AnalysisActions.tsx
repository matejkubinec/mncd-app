import { useDownloadAnalysis } from '@hooks/api/analysis';
import { Analysis } from '@lib/types/analysis';
import Button from '@mui/material/Button';
import { FC } from 'react';

interface Props {
  analysis: Analysis;
}

const AnalysisActions: FC<Props> = ({ analysis }) => {
  const { mutate } = useDownloadAnalysis();

  return (
    <Button variant='contained' onClick={() => mutate(analysis.id)}>
      Download
    </Button>
  );
};

export default AnalysisActions;
