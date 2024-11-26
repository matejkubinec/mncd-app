import { SelectControl, SelectOption } from '@components/select';
import { AnalyzeFormValues } from '@lib/form/analyze.form';
import { Stack, Typography } from '@mui/material';
import { FC, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { usePickedDataset } from '../SessionAnalysis.hooks';

const LayerSelectionStep: FC = () => {
  const { control } = useFormContext<AnalyzeFormValues>();
  const dataset = usePickedDataset();
  const layerOptions = useMemo<SelectOption[]>(
    () =>
      dataset?.layerNames.map((layer, idx) => ({
        value: idx,
        label: layer,
      })) || [],
    [dataset],
  );

  return (
    <Stack gap={1}>
      <Typography variant='h6'>3. Layer Selection</Typography>
      <Typography variant='body2'>
        Please select a layer to run the community detection on
      </Typography>
      <Stack width={250}>
        <SelectControl
          name='selectedLayer'
          control={control}
          options={layerOptions}
          rules={{
            required: 'Layer selection is required',
          }}
        />
      </Stack>
    </Stack>
  );
};

export default LayerSelectionStep;
