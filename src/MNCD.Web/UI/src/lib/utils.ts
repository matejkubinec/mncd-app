import { MouseEvent, MouseEventHandler } from 'react';

export const withoutBubbling =
  (action: MouseEventHandler<HTMLButtonElement>) =>
  (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    action(e);
  };
