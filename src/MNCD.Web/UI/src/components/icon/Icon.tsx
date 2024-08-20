import { FC } from 'react';
import { IconName, IconProps } from './Icon.types';
import {
  ArrowLeftIcon,
  Cross1Icon,
  EnterIcon,
  ExclamationTriangleIcon,
  FileIcon,
  Pencil1Icon,
} from '@radix-ui/react-icons';

export const Icon: FC<IconProps> = ({ name, ...props }) => {
  const IconElement = IconMap[name];

  return <IconElement {...props} />;
};

const IconMap: Record<IconName, typeof Cross1Icon> = {
  cross1: Cross1Icon,
  pencil1: Pencil1Icon,
  enter: EnterIcon,
  'left-arrow': ArrowLeftIcon,
  'exclamation-triangle': ExclamationTriangleIcon,
  file: FileIcon,
};
