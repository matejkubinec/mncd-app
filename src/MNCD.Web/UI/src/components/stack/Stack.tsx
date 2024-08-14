import { FC } from 'react';
import { StackProps } from './Stack.types';
import { css } from '@emotion/react';

export const Stack: FC<StackProps> = ({
  flexDirection,
  gap,
  alignItems,
  justifyContent,
  sx,
  children,
}) => (
  <div
    css={[
      css({
        display: 'flex',
        gap,
        flexDirection,
        alignItems,
        justifyContent,
      }),
      sx ? css(sx) : {},
    ]}
  >
    {children}
  </div>
);
