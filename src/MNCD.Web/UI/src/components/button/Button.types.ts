import { PropsWithChildren } from 'react';

export interface ButtonProps extends PropsWithChildren {
  onClick?: () => void;
  type?: HTMLButtonElement['type'];
}

export interface LinkButtonProps extends PropsWithChildren {
  to: string;
}
