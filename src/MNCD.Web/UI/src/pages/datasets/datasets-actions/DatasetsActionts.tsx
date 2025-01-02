import { useDatasets, useDeleteDataset } from '@hooks/api/dataset';
import { DatasetListItem } from '@lib/types/dataset';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { useSnackbar } from 'notistack';
import { FC, useCallback, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { withoutBubbling } from '@lib/utils';

interface Props {
  dataset: DatasetListItem;
}

export const DatasetsActions: FC<Props> = ({ dataset }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { mutate } = useDeleteDataset();
  const { refetch } = useDatasets({
    refetchOnMount: false,
  });
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleClose = useCallback(() => {
    setModalOpen(false);
  }, []);

  const handleDelete = useCallback(async () => {
    handleClose();

    mutate(dataset.id, {
      onSuccess: () => {
        refetch();

        enqueueSnackbar('Dataset deleted');
      },
      onError: () => {
        enqueueSnackbar('There was a problem deleting the dataset', {
          variant: 'error',
        });
      },
    });
  }, [handleClose, mutate, dataset.id, enqueueSnackbar, refetch]);

  const openDeleteModal = () => {
    setModalOpen(true);
  };

  const editDataset = () => {
    navigate(`/datasets/${dataset.id}/edit`);
  };

  return (
    <Stack
      flexDirection='row'
      gap={1}
      justifyContent='flex-end'
      className='row-actions'
      visibility='hidden'
    >
      <IconButton size='small' onClick={withoutBubbling(editDataset)}>
        <EditIcon />
      </IconButton>
      <IconButton
        size='small'
        color='error'
        onClick={withoutBubbling(openDeleteModal)}
      >
        <DeleteIcon />
      </IconButton>
      <Dialog open={modalOpen} onClose={withoutBubbling(handleClose)}>
        <DialogTitle>Delete dataset</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this dataset?
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
