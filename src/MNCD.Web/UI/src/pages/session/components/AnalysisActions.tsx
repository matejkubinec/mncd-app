import { FC, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import { withoutBubbling } from '@lib/utils';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import { Session } from '@lib/types/session';
import { Analysis } from '@lib/types/analysis';
import DownloadIcon from '@mui/icons-material/Download';
import { useDownloadAnalysis, useRemoveAnalysis } from '@hooks/api/analysis';
import { enqueueSnackbar } from 'notistack';
import { useRouteSession } from '@hooks/route';

export interface Props {
  session: Session;
  analysis: Analysis;
}

const AnalysisItemActions: FC<Props> = ({ analysis }) => {
  const { refetch } = useRouteSession();
  const [deleting, setDeleting] = useState(false);
  const { mutate: download } = useDownloadAnalysis();
  const { mutateAsync: removeAsync } = useRemoveAnalysis();

  const handleDownload = () => download(analysis.id);

  const removeAnalysis = () => {
    removeAsync(analysis.id, {
      onSuccess: () => {
        refetch();

        enqueueSnackbar('Analysis successfully deleted', {
          variant: 'success',
        });
      },
      onError: () =>
        enqueueSnackbar('There was a problem deleting the analysis', {
          variant: 'error',
        }),
    });

    setDeleting(false);
  };

  const promptDeletion = () => setDeleting(true);

  const cancelDeletion = () => setDeleting(false);

  return (
    <Stack
      flexDirection='row'
      gap={1}
      justifyContent='flex-end'
      className='row-actions'
      visibility='hidden'
    >
      <IconButton size='small' onClick={withoutBubbling(handleDownload)}>
        <DownloadIcon />
      </IconButton>
      <IconButton
        size='small'
        color='error'
        onClick={withoutBubbling(promptDeletion)}
      >
        <DeleteIcon />
      </IconButton>
      <Dialog
        open={deleting}
        onClose={cancelDeletion}
        aria-labelledby='alert-delete-analysis-title'
        aria-describedby='alert-delete-analysis-description'
      >
        <DialogTitle id='alert-delete-analysis-title'>
          Delete Analysis
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-delete-analysis-description'>
            Are you sure you want to delete this analysis?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={withoutBubbling(cancelDeletion)}>Cancel</Button>
          <Button onClick={withoutBubbling(removeAnalysis)} color='error'>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};

export default AnalysisItemActions;
