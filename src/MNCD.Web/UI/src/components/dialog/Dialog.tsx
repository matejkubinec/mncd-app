import { FC, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  open?: boolean;
}

export const Dialog: FC<Props> = ({ open }) => {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [open]);

  return createPortal(
    <dialog ref={ref}>Hey!</dialog>,
    document.querySelector('#root')!,
  );
};
