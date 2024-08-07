import { FC } from 'react';
import { StackProps } from './Stack.types';
import { css } from '@emotion/react';

export const Stack: FC<StackProps> = ({
  direction,
  gap,
  align,
  justify,
  xs,
  children,
}) => (
  <div
    css={[
      css({
        display: 'flex',
        gap,
        flexDirection: direction,
        alignItems: align,
        justifyContent: justify,
      }),
      xs ? css(xs) : {},
    ]}
  >
    {children}
  </div>
);
