import { InputControl } from '@components/input';
import { Stack } from '@mui/material';
import { FC, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { AnalyzeFormValues } from '@lib/form/analyze.form';

const AlgorithmKClique: FC = () => {
  const { setValue, control } = useFormContext<AnalyzeFormValues>();

  useEffect(() => {
    setValue('analysisAlgorithmParameters', {
      k: '2',
    });
  }, [setValue]);

  return (
    <Stack gap={2} mt={1}>
      <InputControl
        label='K'
        type='number'
        description='Size of smallest clique'
        name='analysisAlgorithmParameters.k'
        control={control}
        rules={{
          required: 'K is required',
          min: {
            value: 1,
            message: 'K must be greater than 1',
          },
        }}
      />
    </Stack>
  );
};

export default AlgorithmKClique;
