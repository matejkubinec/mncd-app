import { FC } from 'react';
import { PageProps } from './Page.types';
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ArrowBack from '@mui/icons-material/ArrowBack';
import { LinearProgress } from '@mui/material';

export const Page: FC<PageProps> = ({
  title,
  backTo,
  loading,
  right,
  children,
}) => {
  const navigate = useNavigate();

  return (
    <Stack direction='column' position='relative' mb={10}>
      {!!title && (
        <Stack
          direction='row'
          alignItems='center'
          justifyContent='space-between'
          my={1}
        >
          <Stack direction='row' alignItems='center' gap={1}>
            {!!backTo && (
              <IconButton onClick={() => navigate(backTo)}>
                <ArrowBack />
              </IconButton>
            )}
            <Typography
              variant='h5'
              sx={{
                pl: backTo ? 0 : 6,
              }}
            >
              {title}
            </Typography>
          </Stack>
          {right && <Stack pr={6}>{right}</Stack>}
        </Stack>
      )}
      {loading && (
        <Stack
          sx={{
            top: -10,
            left: -15,
            right: -15,
            position: 'absolute',
          }}
        >
          <LinearProgress />
        </Stack>
      )}
      <Stack
        direction='column'
        gap={1}
        sx={{
          px: 6,
        }}
      >
        {loading ? <>Loading . . .</> : children}
      </Stack>
    </Stack>
  );
};
