import { InputControlProps } from './Input.types';
import { Controller, FieldValues } from 'react-hook-form';
import TextField from '@mui/material/TextField';

export const InputControl = <T extends FieldValues, K>({
  control,
  textFieldProps,
  ...props
}: InputControlProps<T, K>) => (
  <Controller
    name={props.name}
    control={control}
    rules={props.rules}
    render={({ field, fieldState }) => (
      <TextField
        label={props.label}
        error={!!fieldState.error}
        helperText={
          fieldState.error ? fieldState.error?.message : props.description
        }
        type={props.type}
        {...textFieldProps}
        {...field}
      />
    )}
  />
);
