import { FC } from 'react';
import { cx } from '@emotion/css';
import Button, { ButtonProps } from '@mui/material/Button';
import { Link, LinkProps, useLocation } from 'react-router-dom';

interface Props extends ButtonProps {
  to: string;
}

const LinkButton: FC<Props> = ({ to, children, ...props }) => {
  const location = useLocation();

  return (
    <Button
      className={cx('link-button', location.pathname === to && 'link-active')}
      LinkComponent={ButtonLink}
      href={to}
      {...props}
    >
      {children}
    </Button>
  );
};

const ButtonLink: FC<LinkProps & { href: string }> = (props) => (
  <Link {...props} to={props.href} />
);

export default LinkButton;
