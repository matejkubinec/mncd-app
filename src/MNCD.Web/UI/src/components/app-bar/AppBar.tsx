import { FC } from 'react';
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';

export const AppBar: FC = () => {
  return (
    <nav css={styles.nav}>
      <h1 css={styles.title}>MNCD</h1>
      <Link css={styles.link} to='/'>
        Sessions
      </Link>
      <Link css={styles.link} to='/datasets'>
        Datasets
      </Link>
      <Link css={styles.link} to='/formats'>
        Formats
      </Link>
    </nav>
  );
};

const styles = {
  nav: css({
    width: '100%',
    backgroundColor: '#333',
    color: '#fff',
    padding: '1em',
    gap: '1em',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  }),
  title: css({
    margin: 0,
    fontSize: 25,
  }),
  link: css({
    color: '#fff',
    '&:hover': {
      color: '#ccc',
    },
  }),
};
