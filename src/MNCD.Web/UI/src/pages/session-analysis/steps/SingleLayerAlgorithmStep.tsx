import { SelectControl } from '@components/select';
import { AnalysisAlgorithm } from '@lib/types/analysis';
import { Stack, Typography } from '@mui/material';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import AlgorithmKClique from '../algorithms/AlgorithmKClique';
import AlgorithmLouvain from '../algorithms/AlgorithmLouvain';
import AlgorithmLabelPropagation from '../algorithms/AlgorithmLabelPropagation';
import AlgorithmFluidC from '../algorithms/AlgorithmFluidC';
import { AnalyzeFormValues } from '@lib/form/analyze.form';
import { SINGLE_LAYER_ALGORITHM_OPTIONS } from '@lib/constants';

const SingleLayerAlgorithmStep: FC = () => {
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
          options={SINGLE_LAYER_ALGORITHM_OPTIONS}
          rules={{
            required: 'Algorithm is required',
          }}
        />
        {algorithm === AnalysisAlgorithm.FluidC ? (
          <AlgorithmFluidC />
        ) : algorithm === AnalysisAlgorithm.KClique ? (
          <AlgorithmKClique />
        ) : algorithm === AnalysisAlgorithm.Louvain ? (
          <AlgorithmLouvain />
        ) : algorithm === AnalysisAlgorithm.LabelPropagation ? (
          <AlgorithmLabelPropagation />
        ) : null}
      </Stack>
    </Stack>
  );
};

export default SingleLayerAlgorithmStep;
