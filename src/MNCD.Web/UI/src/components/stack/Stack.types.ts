import { CSSInterpolation } from '@emotion/css/create-instance';
import { CSSProperties, PropsWithChildren } from 'react';

export interface StackProps extends PropsWithChildren {
  flexDirection?: CSSProperties['flexDirection'];
  alignItems?: CSSProperties['alignItems'];
  justifyContent?: CSSProperties['justifyContent'];
  gap?: CSSProperties['gap'];
  sx?: CSSInterpolation;
}
