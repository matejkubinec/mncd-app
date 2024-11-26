import Switch from '@mui/material/Switch';
import { ReactNode } from 'react';
import { Controller, FieldValues } from 'react-hook-form';
import { SwitchControlProps } from './SwitchControl.types';
import {
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
} from '@mui/material';

const SwitchControl = <T extends FieldValues, K>(
  props: SwitchControlProps<T, K>,
): ReactNode => (
  <Controller
    {...props}
    render={({ field, fieldState }) => (
      <FormControl>
        <FormGroup>
          <FormControlLabel
            control={<Switch checked={field.value} {...field} />}
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

export default SwitchControl;
