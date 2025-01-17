import Stack from '@mui/material/Stack';
import { FC, PropsWithChildren } from 'react';

const ComparisonRow: FC<PropsWithChildren> = ({ children }) => (
  <Stack
    direction='row'
    gap={5}
    sx={{
      '& > * ': {
        flex: 1,
      },
    }}
  >
    {children}
  </Stack>
);

export default ComparisonRow;
