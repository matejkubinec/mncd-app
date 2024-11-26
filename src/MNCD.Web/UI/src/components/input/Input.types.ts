import { TextFieldProps } from '@mui/material';
import {
  Control,
  FieldValues,
  Path,
  UseControllerProps,
} from 'react-hook-form';

export interface InputControlProps<T extends FieldValues, K> {
  label?: string;
  name: Path<T>;
  type?: HTMLInputElement['type'];
  control: Control<T, K>;
  rules?: UseControllerProps<T, Path<T>>['rules'];
  description?: string;
  textFieldProps?: TextFieldProps;
}
