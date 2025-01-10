import { SwitchControl } from '@components/switch';
import { AnalyzeFormValues } from '@lib/form/analyze.form';
import { FC, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

const BasicFlattening: FC = () => {
  const { control, setValue } = useFormContext<AnalyzeFormValues>();

  useEffect(() => {
    setValue('flatteningAlgorithmParameters', {});
    setValue('flatteningAlgorithmParameters.weightEdges', false);
  }, [setValue]);

  return (
    <SwitchControl
      label='Weight Edges'
      name='flatteningAlgorithmParameters.weightEdges'
      control={control}
    />
  );
};

export default BasicFlattening;
