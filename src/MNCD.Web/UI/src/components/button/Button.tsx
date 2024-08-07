import { FC } from 'react';
import { ButtonProps, LinkButtonProps } from './Button.types';
import { useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';

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

const styles = {
  primary: css({
    backgroundColor: '#333',
    color: '#fff',

    '&:hover': {
      backgroundColor: '#666',
    },
  }),
};
