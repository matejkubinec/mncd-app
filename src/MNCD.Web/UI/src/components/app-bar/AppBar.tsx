import { FC } from 'react';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { LinkButton } from '@components/link-button';

export const AppBar: FC = () => (
  <MuiAppBar>
    <Toolbar>
      <Typography variant='h6' mr={2}>
        MNCD
      </Typography>
      <LinkButton to='/'>Sessions</LinkButton>
      <LinkButton to='/datasets'>Datasets</LinkButton>
      <LinkButton to='/formats'>Formats</LinkButton>
    </Toolbar>
  </MuiAppBar>
);
