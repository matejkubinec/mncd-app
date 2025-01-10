import { WithClassName } from '@lib/types/common';
import Box from '@mui/material/Box';
import { FC, PropsWithChildren } from 'react';

const Code: FC<PropsWithChildren & WithClassName> = ({
  className,
  children,
}) => (
  <Box
    className={className}
    sx={{
      px: 2,
      borderRadius: 1,
      backgroundColor: 'background.paper',
      pre: {
        fontSize: 'small',
        whiteSpace: 'pre',
      },
    }}
  >
    <pre>{children}</pre>
  </Box>
);

export default Code;
