import { InputControl } from '@components/input';
import { Stack } from '@mui/material';
import { FC, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { usePickedDataset } from '../SessionAnalysis.hooks';
import { AnalyzeFormValues } from '@lib/form/analyze.form';

const AlgorithmClecc: FC = () => {
  const { setValue, control } = useFormContext<AnalyzeFormValues>();
  const dataset = usePickedDataset();

  useEffect(() => {
    setValue('analysisAlgorithmParameters', {
      k: '2',
      alpha: '1',
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
        label='Alpha'
        type='number'
        description='Minimum number of layers on which node must be neighbour'
        name='analysisAlgorithmParameters.alpha'
        control={control}
        rules={{
          required: 'Max Iterations is required',
          max: {
            value: dataset?.layerCount || 0,
            message: `Alpha must be less or equal than number of layers in network (${dataset?.layerCount})`,
          },
        }}
      />
    </Stack>
  );
};

export default AlgorithmClecc;
