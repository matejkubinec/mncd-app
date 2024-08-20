import { FC } from 'react';
import { SelectControlProps, SelectProps } from './Select.types';
import { Controller, FieldValues } from 'react-hook-form';
import { Stack } from '@components/stack';
import { css } from '@emotion/react';

export const Select: FC<SelectProps> = ({
  label,
  name,
  options = [],
  ...props
}) => (
  <Stack flexDirection='column'>
    {!!label && (
      <label css={styles.label} htmlFor={props.id}>
        {label}
      </label>
    )}
    <select css={styles.select} name={name} {...props}>
      {options.map((opt) => (
        <option value={opt.value}>{opt.label}</option>
      ))}
    </select>
  </Stack>
);

export const SelectControl = <T extends FieldValues, K>({
  control,
  ...props
}: SelectControlProps<T, K>) => (
  <Controller
    name={props.name}
    control={control}
    render={({ field }) => <Select {...props} {...field} />}
  />
);

const styles = {
  label: css({
    marginBottom: 5,
  }),
  select: css({
    border: '1px solid #000',
    borderRadius: 4,
    boxSizing: 'border-box',
    width: '100%',
    padding: '0.6em 0.6em',
    backgroundColor: '#fff',
  }),
};
