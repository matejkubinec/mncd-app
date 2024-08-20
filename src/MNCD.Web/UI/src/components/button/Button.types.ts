import { IconName } from '@components/icon';
import { WithClassName } from '@lib/types/common';
import { PropsWithChildren } from 'react';

export type ButtonVariant = 'primary' | 'danger';

export interface ButtonProps extends PropsWithChildren, WithClassName {
  onClick?: () => void;
  type?: HTMLButtonElement['type'];
  variant?: ButtonVariant;
}

export interface LinkButtonProps extends PropsWithChildren, WithClassName {
  to: string;
}

type IconButtonPropsCommon = {
  name: IconName;
  type?: HTMLButtonElement['type'];
  variant?: 'filled' | 'outlined';
} & WithClassName;

export type IconButtonPropsConditional =
  | {
      to: string;
      onClick?: never;
    }
  | {
      to?: never;
      onClick: () => void;
    };

export type IconButtonProps = IconButtonPropsCommon &
  IconButtonPropsConditional;
