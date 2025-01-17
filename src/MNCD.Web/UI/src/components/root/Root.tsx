import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { AppBar } from '@components/app-bar';
import Stack from '@mui/material/Stack';

const Root: FC = () => (
  <Stack
    component='main'
    sx={{
      p: 0,
      width: '100%',
      height: '100%',

      // global styles
      a: {
        color: 'primary.main',
        textDecoration: 'none',

        '&:hover': {
          color: 'primary.dark',
        },
      },
    }}
  >
    <AppBar />
    <Stack
      sx={{
        px: {
          sm: 2,
          md: 4,
          lg: 6,
        },
        py: 2,
        mt: 8,
      }}
    >
      <Outlet />
    </Stack>
  </Stack>
);

export default Root;
