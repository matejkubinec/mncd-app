import { FC } from 'react';
import { PageProps } from './Page.types';
import { Stack } from '../stack';

export const Page: FC<PageProps> = ({ title, children }) => (
  <Stack direction='column'>
    {!!title && <h2>{title}</h2>}
    <Stack direction='column' gap={10}>
      {children}
    </Stack>
  </Stack>
);
