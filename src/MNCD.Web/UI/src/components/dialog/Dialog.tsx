import { IconButton } from '@components/button';
import { Stack } from '@components/stack';
import { css } from '@emotion/react';
import { FC, PropsWithChildren, useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface Props extends PropsWithChildren {
  open?: boolean;
  onClose?: () => void;
}

export const Dialog: FC<Props> = ({ open, onClose, children }) => {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [open]);

  const handleClose = useCallback(() => {
    ref.current?.close();
    onClose && onClose();
  }, [onClose]);

  return createPortal(
    <dialog ref={ref} css={styles.dialog}>
      <Stack
        flexDirection='row'
        alignItems='center'
        justifyContent='space-between'
        gap={10}
      >
        <h4 css={styles.title}>Title</h4>
        <IconButton name='cross1' variant='outlined' onClick={handleClose} />
      </Stack>
      {children}
    </dialog>,
    document.querySelector('#root')!,
  );
};

const styles = {
  dialog: css({
    borderWidth: 1,
    borderRadius: 4,
    minWidth: 300,
  }),
  title: css({
    margin: 0,
  }),
};
