import { FC } from 'react';
import { PageProps } from './Page.types';
import { Stack } from '@components/stack';

export const Page: FC<PageProps> = ({ title, loading, children }) => (
  <Stack flexDirection='column'>
    {!!title && <h2>{title}</h2>}
    {loading ? (
      <Stack flexDirection='column' gap={10}>
        Loading . . .
      </Stack>
    ) : (
      <Stack flexDirection='column' gap={10}>
        {children}
      </Stack>
    )}
  </Stack>
);
