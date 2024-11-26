import { TextFieldProps } from '@mui/material';
import {
  Control,
  FieldValues,
  Path,
  UseControllerProps,
} from 'react-hook-form';

export interface SelectOption {
  value: string | number;
  label: string;
}

export interface SelectControlProps<T extends FieldValues, K> {
  name: Path<T>;
  control: Control<T, K>;
  label?: string;
  options?: SelectOption[];
  rules?: UseControllerProps<T, Path<T>>['rules'];
  description?: string;
  fieldProps?: TextFieldProps;
}
