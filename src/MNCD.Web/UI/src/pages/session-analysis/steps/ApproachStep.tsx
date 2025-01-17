import { SelectControl } from '@components/select';
import { APPROACH_OPTIONS } from '@lib/constants';
import { AnalyzeFormValues } from '@lib/form/analyze.form';
import { Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

const ApproachStep: FC = () => {
  const { control } = useFormContext<AnalyzeFormValues>();

  return (
    <Stack gap={1} width={250}>
      <Typography variant='h6'>2. Approach</Typography>
      <Typography variant='body2'>
        Please select an analysis approach
      </Typography>
      <SelectControl
        name='approach'
        control={control}
        options={APPROACH_OPTIONS}
        rules={{
          required: 'Analysis approach is required',
        }}
      />
    </Stack>
  );
};

export default ApproachStep;
