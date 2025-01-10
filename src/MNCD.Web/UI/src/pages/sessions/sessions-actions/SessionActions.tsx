import { useDeleteSession, useSessions } from '@hooks/api/session';
import { Session } from '@lib/types/session';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useSnackbar } from 'notistack';
import { FC, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Stack from '@mui/material/Stack';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { withoutBubbling } from '@lib/utils';

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

        enqueueSnackbar('Session deleted', {
          variant: 'success',
        });
      },
      onError: () => {
        enqueueSnackbar('There was a problem deleting the session', {
          variant: 'error',
        });
      },
    });
  }, [handleClose, mutate, session, refetch, enqueueSnackbar]);

  const removeSession = () => {
    setModalOpen(true);
  };

  const editSession = () => {
    navigate(`/sessions/${session.id}/edit`);
  };

  return (
    <Stack
      gap={1}
      direction='row'
      justifyContent='flex-end'
      className='row-actions'
      visibility='hidden'
    >
      <IconButton onClick={withoutBubbling(editSession)}>
        <EditIcon />
      </IconButton>
      <IconButton color='error' onClick={withoutBubbling(removeSession)}>
        <DeleteIcon />
      </IconButton>
      <Dialog open={modalOpen} onClose={withoutBubbling(handleClose)}>
        <DialogTitle>Delete session</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this session?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={withoutBubbling(handleClose)}>Cancel</Button>
          <Button onClick={withoutBubbling(handleDelete)} color='error'>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};
