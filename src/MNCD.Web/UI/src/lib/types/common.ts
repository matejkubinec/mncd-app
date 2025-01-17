import { Interpolation, Theme } from '@emotion/react';

export interface WithCss {
  css?: Interpolation<Theme>;
}

export interface WithClassName {
  className?: string;
}
