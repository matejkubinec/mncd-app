import { PropsWithChildren } from 'react';

export interface PageProps extends PropsWithChildren {
  title?: string;
  loading?: boolean;
  backTo?: string;
}
