import { SelectControl } from '@components/select';
import { useDatasets } from '@hooks/api/dataset';
import { AnalyzeFormValues } from '@lib/form/analyze.form';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

const DatasetStep: FC = () => {
  const { data = [] } = useDatasets();
  const { control } = useFormContext<AnalyzeFormValues>();

  return (
    <Stack gap={1}>
      <Typography variant='h6'>1. Dataset</Typography>
      <Typography variant='body2'>
        Please select a dataset to analyze
      </Typography>
      <Stack width={250}>
        <SelectControl
          name='datasetId'
          control={control}
          options={data.map((dataset) => ({
            value: dataset.id,
            label: dataset.name,
          }))}
          rules={{
            required: 'Dataset is required',
          }}
        />
      </Stack>
    </Stack>
  );
};

export default DatasetStep;
