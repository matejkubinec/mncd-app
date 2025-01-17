import { WithClassName } from '@lib/types/common';
import Box from '@mui/material/Box';
import { FC, PropsWithChildren } from 'react';
import { grey } from '@mui/material/colors';

const Code: FC<PropsWithChildren & WithClassName> = ({
  className,
  children,
}) => (
  <Box
    className={className}
    sx={(theme) => ({
      px: 2,
      borderRadius: 1,
      backgroundColor: 'background.paper',
      pre: {
        fontSize: 'small',
        whiteSpace: 'pre',
      },
      ...theme.applyStyles('dark', {
        backgroundColor: grey['900'],
      }),
    })}
  >
    <pre>{children}</pre>
  </Box>
);

export default Code;
