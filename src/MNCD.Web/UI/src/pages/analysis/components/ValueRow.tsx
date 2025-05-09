import { FC, ReactNode, useMemo } from 'react';
import ValueRowLabel from './ValueRowLabel';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

interface Props {
  label: string;
  value?: ReactNode | number | number[] | null;
  tooltip?: string;
}

const ValueRow: FC<Props> = ({ label, value, tooltip }) => {
  const parsedValue = useMemo(() => {
    if (typeof value !== 'string') {
      return value;
    }

    try {
      return JSON.parse(value);
    } catch (error) {
      return value;
    }
  }, [value]);

  if (label === 'Relevances') {
    console.log(label, value, typeof value);
  }

  if (value === null || value === undefined) {
    return null;
  }

  if (Array.isArray(value) || Array.isArray(parsedValue)) {
    const arr = (Array.isArray(value) ? value : parsedValue) as [];

    if (!arr.length) {
      return null;
    }

    return (
      <Stack direction='row'>
        <ValueRowLabel label={label} tooltip={tooltip} />
        <Stack width={75}>
          {arr.map((val, idx) => (
            <Stack direction='row' justifyContent='space-between'>
              <Typography fontFamily='Roboto Mono, monospace'>
                {idx + 1}.
              </Typography>
              <Typography fontFamily='Roboto Mono, monospace'>
                {Number(val).toFixed(2)}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Stack>
    );
  }

  if (typeof value === 'number') {
    if (value === 0) {
      return null;
    }

    return (
      <Stack direction='row'>
        <ValueRowLabel label={label} tooltip={tooltip} />
        <Typography
          width={75}
          textAlign='right'
          fontFamily='Roboto Mono, monospace'
        >
          {value.toFixed(2)}
        </Typography>
      </Stack>
    );
  }

  return (
    <Stack direction='row'>
      <ValueRowLabel label={label} tooltip={tooltip} />
      <Typography textAlign='left' fontFamily='Roboto Mono, monospace'>
        {value}
      </Typography>
    </Stack>
  );
};

export default ValueRow;
