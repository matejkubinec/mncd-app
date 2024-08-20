import { FC } from 'react';
import { PageProps } from './Page.types';
import { Stack } from '@components/stack';
import { IconButton } from '@components/button';
import { useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';

export const Page: FC<PageProps> = ({ title, backTo, loading, children }) => {
  const navigate = useNavigate();

  return (
    <Stack flexDirection='column'>
      {!!title && (
        <Stack
          flexDirection='row'
          gap={10}
          alignItems='center'
          css={styles.header}
        >
          {!!backTo && (
            <IconButton
              name='left-arrow'
              variant='outlined'
              onClick={() => navigate(backTo)}
              css={styles.backButton}
            />
          )}
          <h2>{title}</h2>
        </Stack>
      )}
      {loading ? (
        <Stack flexDirection='column' gap={10}>
          Loading . . .
        </Stack>
      ) : (
        <Stack flexDirection='column' gap={10}>
          {children}
        </Stack>
      )}
    </Stack>
  );
};

const styles = {
  header: css({
    position: 'relative',
    marginBottom: 10,
  }),
  backButton: css({
    position: 'absolute',
    left: -35,
  }),
};
