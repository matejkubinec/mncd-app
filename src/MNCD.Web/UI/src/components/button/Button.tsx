import { FC } from 'react';
import { ButtonProps, IconButtonProps, LinkButtonProps } from './Button.types';
import { useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';
import { Icon } from '@components/icon';
import { Stack } from '@components/stack';

export const Button: FC<ButtonProps> = ({
  onClick,
  type = 'button',
  children,
}) => (
  <button css={styles.primary} onClick={onClick} type={type}>
    {children}
  </button>
);

export const LinkButton: FC<LinkButtonProps> = ({ to, children }) => {
  const navigate = useNavigate();

  return <Button onClick={() => navigate(to)}>{children}</Button>;
};

export const IconButton: FC<IconButtonProps> = ({
  name,
  onClick,
  to,
  type = 'button',
}) => {
  const navigate = useNavigate();

  return (
    <button
      css={styles.iconButton}
      onClick={to ? () => navigate(to) : onClick}
      type={type}
    >
      <Stack alignItems='center' justifyContent='center'>
        <Icon name={name} css={styles.icon} />
      </Stack>
    </button>
  );
};

const styles = {
  primary: css({
    backgroundColor: '#333',
    color: '#fff',

    '&:hover': {
      backgroundColor: '#666',
    },
  }),
  iconButton: css({
    padding: 7,
    borderRadius: '50%',
    backgroundColor: '#333',
    color: '#fff',

    '&:hover': {
      backgroundColor: '#666',
    },
  }),
  icon: css({
    width: 15,
    height: 15,
  }),
};
