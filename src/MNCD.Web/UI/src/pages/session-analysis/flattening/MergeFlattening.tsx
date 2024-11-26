import { SwitchControl } from '@components/switch';
import { AnalyzeFormValues } from '@lib/form/analyze.form';
import { Typography } from '@mui/material';
import { FC, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import MergeLayers from '../form-elements/MergeLayers';
import { usePickedDataset } from '../SessionAnalysis.hooks';

const MergeFlattening: FC = () => {
  const { control, setValue } = useFormContext<AnalyzeFormValues>();
  const dataset = usePickedDataset();

  useEffect(() => {
    setValue('flatteningAlgorithmParameters', {});
    setValue('flatteningAlgorithmParameters.includeWeights', true);
  }, [setValue]);

  useEffect(() => {
    if (dataset?.layerNames) {
      const indices = dataset.layerNames.map((_, idx) => idx);
      setValue('flatteningAlgorithmParameters.layerIndices', indices);
    }
  }, [dataset, setValue]);

  return (
    <>
      <SwitchControl
        label='Include Weights'
        name='flatteningAlgorithmParameters.includeWeights'
        control={control}
      />
      <Typography variant='subtitle1'>Included Layers</Typography>
      {dataset && <MergeLayers layers={dataset.layerNames} />}
    </>
  );
};

export default MergeFlattening;
