import { SelectHTMLAttributes } from 'react';
import { Control, FieldValues, Path } from 'react-hook-form';

export interface SelectOption {
  value: string | number;
  label: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options?: SelectOption[];
}

export interface SelectControlProps<T extends FieldValues, K>
  extends SelectProps {
  name: Path<T>;
  control: Control<T, K>;
}
