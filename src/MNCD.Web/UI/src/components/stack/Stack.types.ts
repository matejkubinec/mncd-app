import { CSSInterpolation } from '@emotion/css/create-instance';
import { CSSProperties, PropsWithChildren } from 'react';

export interface StackProps extends PropsWithChildren {
  direction?: CSSProperties['flexDirection'];
  align?: CSSProperties['alignContent'];
  justify?: CSSProperties['justifyContent'];
  gap?: CSSProperties['gap'];
  xs?: CSSInterpolation;
}
