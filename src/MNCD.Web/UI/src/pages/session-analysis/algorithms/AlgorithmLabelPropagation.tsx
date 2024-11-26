import { InputControl } from '@components/input';
import { Stack } from '@mui/material';
import { FC, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { AnalyzeFormValues } from '@lib/form/analyze.form';

const AlgorithmLabelPropagation: FC = () => {
  const { setValue, control } = useFormContext<AnalyzeFormValues>();

  useEffect(() => {
    setValue('analysisAlgorithmParameters', {
      maxIterations: '2',
    });
  }, [setValue]);

  return (
    <Stack gap={2} mt={1}>
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
            message: 'K must be greater than 0',
          },
        }}
      />
    </Stack>
  );
};

export default AlgorithmLabelPropagation;
