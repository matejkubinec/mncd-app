import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { FC } from 'react';

interface Props {
  label: string;
  tooltip?: string;
}

const ValueRowLabel: FC<Props> = ({ label, tooltip }) => (
  <Stack
    height={30}
    width={200}
    direction='row'
    alignItems='center'
    justifyContent='flex-start'
  >
    <Typography>{label}</Typography>
    {!!tooltip && (
      <Tooltip title={tooltip}>
        <IconButton size='small'>
          <InfoOutlinedIcon />
        </IconButton>
      </Tooltip>
    )}
  </Stack>
);

export default ValueRowLabel;
