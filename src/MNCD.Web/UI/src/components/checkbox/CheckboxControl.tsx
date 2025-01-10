import { ReactNode } from 'react';
import { Controller, FieldValues } from 'react-hook-form';
import { CheckboxControlProps } from './CheckboxControl.types';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormHelperText from '@mui/material/FormHelperText';

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
