import { FC } from 'react';
import { InputControlProps, InputProps } from './Input.types';
import { css } from '@emotion/react';
import { Controller, FieldValues } from 'react-hook-form';
import { Stack } from '@components/stack';
import { Icon } from '@components/icon';

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

export const FileInput: FC<InputProps> = ({ label, ...props }) => (
  <Stack flexDirection='column'>
    {!!label && (
      <label css={styles.label} htmlFor={props.id}>
        {label}
      </label>
    )}
    <Stack css={styles.fileInputContainer}>
      <input
        css={[styles.input, styles.fileInput]}
        type='file'
        {...props}
        value={undefined}
      />
      <Icon name='file' css={styles.fileInputIcon} />
    </Stack>
  </Stack>
);

export const FileInputControl = <T extends FieldValues, K>({
  control,
  ...props
}: InputControlProps<T, K>) => (
  <Controller
    name={props.name}
    control={control}
    render={({ field }) => (
      <FileInput
        {...props}
        {...field}
        onChange={(event) =>
          field.onChange(event.target.files ? event.target.files[0] : undefined)
        }
      />
    )}
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
    fontSize: 14,
    width: '100%',
    padding: 8,
  }),
  fileInput: css({
    cursor: 'pointer',

    '::file-selector-button': {
      display: 'none',
    },

    '&:hover': {
      backgroundColor: '#eee',
    },
  }),
  fileInputContainer: css({
    position: 'relative',
  }),
  fileInputIcon: css({
    position: 'absolute',
    top: 10,
    right: 10,
  }),
};
