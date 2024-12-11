import { SelectControl } from '@components/select';
import { AnalysisAlgorithm } from '@lib/types/analysis';
import { Stack, Typography } from '@mui/material';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { AnalyzeFormValues } from '@lib/form/analyze.form';
import { MULTI_LAYER_ALGORITHM_OPTIONS } from '@lib/constants';
import AlgorithmClecc from '../algorithms/AlgorithmClecc';

const MultiLayerAlgorithmStep: FC = () => {
  const { control } = useFormContext<AnalyzeFormValues>();
  const algorithm = useWatch({ name: 'analysisAlgorithm', control });

  return (
    <Stack gap={1}>
      <Typography variant='h6'>4. Algorithm</Typography>
      <Typography variant='body2'>
        Please select an algorithm (and parameters) for community detection
      </Typography>
      <Stack gap={1} width={250}>
        <SelectControl
          name='analysisAlgorithm'
          control={control}
          options={MULTI_LAYER_ALGORITHM_OPTIONS}
          rules={{
            required: 'Algorithm is required',
          }}
        />
        {algorithm === AnalysisAlgorithm.CLECC ? <AlgorithmClecc /> : null}
      </Stack>
    </Stack>
  );
};

export default MultiLayerAlgorithmStep;
