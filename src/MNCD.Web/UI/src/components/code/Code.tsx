import { css } from '@emotion/react';
import { WithClassName } from '@lib/types/common';
import { FC, PropsWithChildren } from 'react';

export const Code: FC<PropsWithChildren & WithClassName> = ({
  className,
  children,
}) => (
  <div css={styles.container}>
    <pre css={styles.code} className={className}>
      {children}
    </pre>
  </div>
);

const styles = {
  container: css({
    padding: '5px 15px',
    whiteSpace: 'pre',
    backgroundColor: '#eee',
  }),
  code: css({
    whiteSpace: 'pre',
    fontSize: 14,
  }),
};
