import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
} from '@mui/material';
import { ReactNode } from 'react';
import { Controller, FieldValues } from 'react-hook-form';
import { CheckboxControlProps } from './CheckboxControl.types';

const CheckboxControl = <T extends FieldValues, K>(
  props: CheckboxControlProps<T, K>,
): ReactNode => (
  <Controller
    {...props}
    render={({ field, fieldState }) => (
      <FormControl>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox {...field} />}
            label={props.label}
          />
        </FormGroup>
        <FormHelperText error={!!fieldState.error}>
          {fieldState.error ? fieldState.error?.message : props.description}
        </FormHelperText>
      </FormControl>
    )}
  />
);

export default CheckboxControl;
