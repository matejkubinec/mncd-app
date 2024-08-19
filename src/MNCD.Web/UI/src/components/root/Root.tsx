import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { css } from '@emotion/react';
import { AppBar } from '@components/app-bar';

export const Root: FC = () => (
  <main css={styles.main}>
    <AppBar />
    <div css={styles.content}>
      <Outlet />
    </div>
  </main>
);

const styles = {
  main: css({
    padding: 0,
    width: '100%',
    height: '100%',
  }),
  content: {
    padding: '1em',
  },
};