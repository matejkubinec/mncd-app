import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { FC, ReactNode } from 'react';

interface Props {
  label: string;
  value?: ReactNode | number | number[] | null;
  tooltip?: string;
}

const ValueRow: FC<Props> = ({ label, value, tooltip }) => {
  if (value === null || value === undefined) {
    return null;
  }

  if (Array.isArray(value)) {
    return (
      <Stack direction='row'>
        <Stack>
          <Typography width={200}>{label}</Typography>
          {!!tooltip && (
            <Tooltip title={tooltip}>
              <IconButton>
                <InfoOutlinedIcon />
              </IconButton>
            </Tooltip>
          )}
        </Stack>
        <Stack width={75}>
          {value.map((val, idx) => (
            <Stack direction='row' justifyContent='space-between'>
              <Typography fontFamily='Roboto Mono, monospace'>
                {idx + 1}.
              </Typography>
              <Typography fontFamily='Roboto Mono, monospace'>
                {val.toFixed(2)}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Stack>
    );
  }

  if (typeof value === 'number') {
    return (
      <Stack direction='row'>
        <Typography width={200}>{label}</Typography>
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
      <Typography width={200}>{label}</Typography>
      <Typography textAlign='left' fontFamily='Roboto Mono, monospace'>
        {value}
      </Typography>
    </Stack>
  );
};

export default ValueRow;
