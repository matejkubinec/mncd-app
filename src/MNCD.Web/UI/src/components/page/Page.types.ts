import { PropsWithChildren, ReactElement } from 'react';

export interface PageProps extends PropsWithChildren {
  title?: string;
  loading?: boolean;
  backTo?: string;
  right?: ReactElement;
}
