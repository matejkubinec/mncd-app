import { SelectControlProps } from './Select.types';
import { Controller, FieldValues } from 'react-hook-form';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

const SelectControl = <T extends FieldValues, K>({
  options,
  ...props
}: SelectControlProps<T, K>) => (
  <Controller
    {...props}
    render={({ field, fieldState }) => (
      <TextField
        label={props.label}
        error={!!fieldState.error}
        helperText={fieldState.error?.message}
        select
        {...field}
      >
        {options?.map((opt) => (
          <MenuItem value={opt.value}>{opt.label}</MenuItem>
        ))}
      </TextField>
    )}
  />
);

export default SelectControl;
