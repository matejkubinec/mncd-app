import { DatasetFormat } from '@lib/types/dataset';

export interface AddDatasetForm {
  name: string;
  format: DatasetFormat;
  file?: File;
}

export const defaultValues: AddDatasetForm = {
  name: '',
  format: DatasetFormat.MPX,
};
