import { InputControl } from '@components/input';
import { Stack } from '@mui/material';
import { FC, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { usePickedDataset } from '../SessionAnalysis.hooks';
import { AnalyzeFormValues } from '@lib/form/analyze.form';

const AlgorithmFluidC: FC = () => {
  const { setValue, control } = useFormContext<AnalyzeFormValues>();
  const dataset = usePickedDataset();

  useEffect(() => {
    setValue('analysisAlgorithmParameters', {
      k: '2',
      maxIterations: '100',
    });
  }, [setValue]);

  return (
    <Stack gap={2} mt={1}>
      <InputControl
        label='K'
        type='number'
        description='Number of communities'
        name='analysisAlgorithmParameters.k'
        control={control}
        rules={{
          required: 'K is required',
          max: {
            value: dataset?.nodeCount || 0,
            message: `K must be less than number of actors (${dataset?.nodeCount}).`,
          },
        }}
      />
      <InputControl
        label='Max Iterations'
        type='number'
        description='Number of iterations'
        name='analysisAlgorithmParameters.maxIterations'
        control={control}
        rules={{
          required: 'Max Iterations is required',
          min: {
            value: 0,
            message: 'Max Iterations must be greater than zero',
          },
        }}
      />
    </Stack>
  );
};

export default AlgorithmFluidC;
