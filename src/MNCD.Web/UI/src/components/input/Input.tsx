import { FC } from 'react';
import { InputControlProps, InputProps } from './Input.types';
import { css } from '@emotion/react';
import { Controller, FieldValues } from 'react-hook-form';
import { Stack } from '@components/stack';

export const Input: FC<InputProps> = ({ label, ...props }) => (
  <Stack flexDirection='column'>
    {!!label && (
      <label css={styles.label} htmlFor={props.id}>
        {label}
      </label>
    )}
    <input css={styles.input} {...props} />
  </Stack>
);

export const InputControl = <T extends FieldValues, K>({
  control,
  ...props
}: InputControlProps<T, K>) => (
  <Controller
    name={props.name}
    control={control}
    render={({ field }) => <Input {...props} {...field} />}
  />
);

const styles = {
  label: css({
    marginBottom: 5,
  }),
  input: css({
    border: '1px solid #000',
    borderRadius: 4,
    boxSizing: 'border-box',
    width: '100%',
    padding: '0.6em 0.6em',
  }),
};
