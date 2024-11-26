import { InputControl } from '@components/input';
import { SwitchControl } from '@components/switch';
import { AnalyzeFormValues } from '@lib/form/analyze.form';
import { Typography } from '@mui/material';
import { FC, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import LayerRelevances from '../form-elements/LayerRelevances';

const LocalSimplification: FC = () => {
  const { control, setValue } = useFormContext<AnalyzeFormValues>();

  useEffect(() => {
    setValue('flatteningAlgorithmParameters.treshold', '1.0');
    setValue('flatteningAlgorithmParameters.weightEdges', 'false');
  }, [setValue]);

  return (
    <>
      <SwitchControl
        label='Weight Edges'
        name='flatteningAlgorithmParameters.weightEdges'
        control={control}
      />
      <InputControl
        label='Threshold'
        // todo: correct spelling
        name='flatteningAlgorithmParameters.treshold'
        type='number'
        control={control}
      />
      <Typography variant='subtitle1'>Relevance</Typography>
      <LayerRelevances />
    </>
  );
};

export default LocalSimplification;
