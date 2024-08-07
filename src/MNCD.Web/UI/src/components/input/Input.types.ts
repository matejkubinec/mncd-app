import { InputHTMLAttributes } from 'react';
import { Control, FieldValues, Path } from 'react-hook-form';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export interface InputControlProps<T extends FieldValues, K>
  extends InputProps {
  name: Path<T>;
  control: Control<T, K>;
}
