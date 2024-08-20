import { Button, IconButton } from '@components/button';
import { Dialog } from '@components/dialog';
import { Stack } from '@components/stack';
import { useDatasets, useDeleteDataset } from '@hooks/api/dataset';
import { DatasetListItem } from '@lib/types/dataset';
import { useSnackbar } from 'notistack';
import { FC, useCallback, useState } from 'react';

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

  return (
    <Stack flexDirection='row' gap={10} justifyContent='flex-end'>
      <IconButton name='cross1' onClick={() => setModalOpen(true)} />
      <IconButton name='pencil1' to={`/datasets/${dataset.id}/edit`} />
      <IconButton name='enter' to={`/datasets/${dataset.id}`} />
      <Dialog open={modalOpen} onClose={handleClose}>
        <p>Are you sure you want to delete this dataset?</p>
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
