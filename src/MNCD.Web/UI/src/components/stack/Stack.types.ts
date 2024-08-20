import { WithClassName } from '@lib/types/common';
import { CSSProperties, PropsWithChildren } from 'react';

export interface StackProps extends PropsWithChildren, WithClassName {
  flexDirection?: CSSProperties['flexDirection'];
  alignItems?: CSSProperties['alignItems'];
  justifyContent?: CSSProperties['justifyContent'];
  gap?: CSSProperties['gap'];
}
