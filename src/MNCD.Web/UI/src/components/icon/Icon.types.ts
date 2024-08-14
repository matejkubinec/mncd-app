import { Cross1Icon } from '@radix-ui/react-icons';
import { ComponentProps } from 'react';

export type IconName = 'cross1' | 'enter' | 'pencil1';

export interface IconProps extends ComponentProps<typeof Cross1Icon> {
  name: IconName;
}
