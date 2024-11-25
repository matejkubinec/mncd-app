import { Dialog } from '@components/dialog';
import { useDeleteSession, useSessions } from '@hooks/api/session';
import { Session } from '@lib/types/session';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useSnackbar } from 'notistack';
import { FC, MouseEventHandler, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Stack from '@mui/material/Stack';

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
  const navigate = useNavigate();

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

  const removeSession: MouseEventHandler<HTMLButtonElement> = (e) => {
    setModalOpen(true);

    e.preventDefault();
    e.stopPropagation();
  };

  const editSession: MouseEventHandler<HTMLButtonElement> = (e) => {
    navigate(`/sessions/${session.id}/edit`);

    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <Stack
      gap={1}
      direction='row'
      justifyContent='flex-end'
      className='row-actions'
      visibility='hidden'
    >
      <IconButton onClick={editSession}>
        <EditIcon />
      </IconButton>
      <IconButton color='error' onClick={removeSession}>
        <DeleteIcon />
      </IconButton>
      <Dialog open={modalOpen} onClose={handleClose}>
        <p>Are you sure you want to delete this session?</p>
        <Stack gap={10} justifyContent='flex-end'>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete} color='error'>
            Delete
          </Button>
        </Stack>
      </Dialog>
    </Stack>
  );
};
