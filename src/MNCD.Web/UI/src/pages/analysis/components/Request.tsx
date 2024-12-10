import { AnalysisApproach, AnalysisRequest } from '@lib/types/analysis';
import { Card, CardContent, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import ValueRow from './ValueRow';
import {
  ANALYSIS_ALGORITHM_NAME,
  APPROACH_NAME,
  FLATTENING_NAME,
} from '@lib/constants';
import { Link } from 'react-router-dom';

const Request: FC<AnalysisRequest> = (props) => {
  console.log('props', props);

  return (
    <Card>
      <CardContent>
        <Stack gap={1}>
          <Typography variant='h6'>Request</Typography>
          <ValueRow label='Approach' value={APPROACH_NAME[props.approach]} />
          <ValueRow
            label='Dataset'
            value={
              <Link to={`/datasets/${props.datasetId}`}>
                {props.dataSetName}
              </Link>
            }
          />
          {props.approach === AnalysisApproach.SingleLayerFlattening && (
            <Algorithm
              label='Flattening'
              title={FLATTENING_NAME[props.flatteningAlgorithm]}
              params={props.flatteningAlgorithmParameters}
            />
          )}
          <Algorithm
            label='Algorithm'
            title={ANALYSIS_ALGORITHM_NAME[props.analysisAlgorithm]}
            params={props.analysisAlgorithmParameters}
          />
        </Stack>
      </CardContent>
    </Card>
  );
};

const Algorithm: FC<{
  title: string;
  label: string;
  params: Record<string, string>;
}> = ({ title, label, params }) => {
  return (
    <ValueRow
      label={label}
      value={
        <Stack>
          <Typography fontFamily='inherit' fontWeight='bold'>
            {title}
          </Typography>
          <Params params={params} />
        </Stack>
      }
    />
  );
};

const Params: FC<{ params: Record<string, string> }> = ({ params }) => {
  const entries = Object.entries(params);

  const formatTitle = (title: string) =>
    title ? `${title[0].toUpperCase()}${title.substring(1)}` : '';

  if (!entries) {
    return null;
  }

  return (
    <Stack>
      {entries.map(([key, value]) => (
        <ValueRow key={key} label={formatTitle(key)} value={value} />
      ))}
    </Stack>
  );
};

export default Request;
