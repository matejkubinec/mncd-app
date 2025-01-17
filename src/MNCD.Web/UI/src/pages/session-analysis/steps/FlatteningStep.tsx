import { SelectControl } from '@components/select';
import { FLATTENING_OPTIONS } from '@lib/constants';
import { AnalyzeFormValues } from '@lib/form/analyze.form';
import { Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import BasicFlattening from '../flattening/BasicFlatteing';
import { FlattenningAlgorithm } from '@lib/types/analysis';
import LocalSimplification from '../flattening/LocalSimplification';
import MergeFlattening from '../flattening/MergeFlattening';

const FlatteningStep: FC = () => {
  const { control } = useFormContext<AnalyzeFormValues>();
  const algorithm = useWatch({ name: 'flatteningAlgorithm', control });

  return (
    <Stack gap={1} width={250}>
      <Typography variant='h6'>3. Flattening Approach</Typography>
      <SelectControl
        label='Approach'
        name='flatteningAlgorithm'
        control={control}
        options={FLATTENING_OPTIONS}
      />
      {algorithm === FlattenningAlgorithm.BasicFlattening ? (
        <BasicFlattening />
      ) : algorithm === FlattenningAlgorithm.LocalSimplification ? (
        <LocalSimplification />
      ) : algorithm === FlattenningAlgorithm.MergeFlattening ? (
        <MergeFlattening />
      ) : null}
    </Stack>
  );
};

export default FlatteningStep;
