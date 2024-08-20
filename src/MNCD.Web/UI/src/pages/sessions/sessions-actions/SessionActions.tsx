import { Button, IconButton } from '@components/button';
import { Dialog } from '@components/dialog';
import { Stack } from '@components/stack';
import { useDeleteSession, useSessions } from '@hooks/api/session';
import { Session } from '@lib/types/session';
import { useSnackbar } from 'notistack';
import { FC, useCallback, useState } from 'react';

interface Props {
  session: Session;
}

export const SessionActions: FC<Props> = ({ session }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { mutate } = useDeleteSession();
  const { refetch } = useSessions({
    refetchOnMount: false,
  });
  const { enqueueSnackbar } = useSnackbar();

  const handleClose = useCallback(() => {
    setModalOpen(false);
  }, []);

  const handleDelete = useCallback(async () => {
    handleClose();

    mutate(session.id, {
      onSuccess: () => {
        refetch();

        enqueueSnackbar('Session deleted');
      },
      onError: () => {
        enqueueSnackbar('There was a problem deleting the session', {
          variant: 'error',
        });
      },
    });
  }, [handleClose, mutate, session, refetch, enqueueSnackbar]);

  return (
    <Stack flexDirection='row' gap={10} justifyContent='flex-end'>
      <IconButton name='cross1' onClick={() => setModalOpen(true)} />
      <IconButton name='pencil1' to={`/sessions/${session.id}/edit`} />
      <IconButton name='enter' to={`/sessions/${session.id}`} />
      <Dialog open={modalOpen} onClose={handleClose}>
        <p>Are you sure you want to delete this session?</p>
        <Stack gap={10} justifyContent='flex-end'>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete} variant='danger'>
            Delete
          </Button>
        </Stack>
      </Dialog>
    </Stack>
  );
};
