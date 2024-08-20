import { FC } from 'react';
import {
  ButtonProps,
  ButtonVariant,
  IconButtonProps,
  LinkButtonProps,
} from './Button.types';
import { useNavigate } from 'react-router-dom';
import { css, SerializedStyles } from '@emotion/react';
import { Icon } from '@components/icon';
import { Stack } from '@components/stack';

export const Button: FC<ButtonProps> = ({
  onClick,
  type = 'button',
  variant = 'primary',
  className,
  children,
}) => (
  <button
    css={[styles.base, buttonVariants[variant]]}
    onClick={onClick}
    type={type}
    className={className}
  >
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
  className,
  type = 'button',
  variant = 'filled',
}) => {
  const navigate = useNavigate();

  return (
    <button
      css={[
        styles.iconButton,
        variant === 'outlined' && styles.iconButtonOutlined,
      ]}
      className={className}
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
  base: css({}),
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
  iconButtonOutlined: css({
    backgroundColor: 'transparent',
    color: '#333',

    '&:hover': {
      borderColor: '#ccc',
      backgroundColor: '#eee',
    },
  }),
};

const buttonVariants: Record<ButtonVariant, SerializedStyles> = {
  primary: css({
    backgroundColor: '#333',
    color: '#fff',

    '&:hover': {
      borderColor: '#666',
      backgroundColor: '#666',
    },
  }),
  danger: css({
    backgroundColor: '#da3b01',
    color: '#ffffff',

    '&:hover': {
      borderColor: '#d13438',
      backgroundColor: '#d13438',
    },
  }),
};
