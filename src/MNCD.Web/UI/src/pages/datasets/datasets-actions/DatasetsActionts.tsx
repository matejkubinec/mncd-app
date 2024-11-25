import { Dialog } from '@components/dialog';
import { useDatasets, useDeleteDataset } from '@hooks/api/dataset';
import { DatasetListItem } from '@lib/types/dataset';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { useSnackbar } from 'notistack';
import { FC, MouseEventHandler, useCallback, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

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

  const openDeleteModal: MouseEventHandler<HTMLButtonElement> = (e) => {
    setModalOpen(true);

    e.preventDefault();
    e.stopPropagation();
  };

  const editDataset: MouseEventHandler<HTMLButtonElement> = (e) => {
    navigate(`/datasets/${dataset.id}/edit`);

    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <Stack
      flexDirection='row'
      gap={1}
      justifyContent='flex-end'
      className='row-actions'
      visibility='hidden'
    >
      <IconButton size='small' onClick={openDeleteModal}>
        <DeleteIcon />
      </IconButton>
      <IconButton size='small' onClick={editDataset}>
        <EditIcon />
      </IconButton>
      <Dialog open={modalOpen} onClose={handleClose}>
        <p>Are you sure you want to delete this dataset?</p>
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
