import { useDatasets } from '@hooks/api/dataset';
import { AnalyzeFormValues } from '@lib/form/analyze.form';
import { useFormContext, useWatch } from 'react-hook-form';

export const usePickedDataset = () => {
  const { control } = useFormContext<AnalyzeFormValues>();
  const { data: datasets } = useDatasets();
  const datasetId = useWatch({ name: 'datasetId', control });
  return datasets?.find((dataset) => dataset.id === datasetId);
};
