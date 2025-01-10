import {
  Control,
  FieldValues,
  Path,
  UseControllerProps,
} from 'react-hook-form';

export interface CheckboxControlProps<T extends FieldValues, K> {
  name: Path<T>;
  control: Control<T, K>;
  label?: string;
  rules?: UseControllerProps<T, Path<T>>['rules'];
  description?: string;
}