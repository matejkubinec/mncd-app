import { FC, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { FormProvider, useForm } from 'react-hook-form';
import { NotesForm, defaultValues } from '@lib/form/notes.form';
import Button from '@mui/material/Button';
import { InputControl } from '@components/input';
import Stack from '@mui/material/Stack';
import { useUpdateNotes } from '@hooks/api/analysis';
import { enqueueSnackbar } from 'notistack';

interface Props {
  analysisId: number;
  notes: string;
}

const Notes: FC<Props> = ({ analysisId, notes }) => {
  const methods = useForm<NotesForm>({
    defaultValues,
  });
  const { mutateAsync } = useUpdateNotes();

  const updateNote = (values: NotesForm) => {
    mutateAsync(values, {
      onSuccess: () =>
        enqueueSnackbar('Notes updated', {
          variant: 'success',
        }),
      onError: () =>
        enqueueSnackbar("Couldn't update notes", {
          variant: 'error',
        }),
    });
  };

  useEffect(() => {
    methods.setValue('analysisId', analysisId);
    methods.setValue('notes', notes);
  }, [methods, analysisId, notes]);

  return (
    <Card>
      <CardContent>
        <Typography variant='h6'>Notes</Typography>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(updateNote)}>
            <Stack gap={1}>
              <InputControl
                name='notes'
                control={methods.control}
                textFieldProps={{
                  multiline: true,
                  minRows: 5,
                  sx: {
                    backgroundColor: 'background.default',
                  },
                }}
              />
              <Stack alignItems='end'>
                <Button type='submit' variant='contained'>
                  Update
                </Button>
              </Stack>
            </Stack>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
};

export default Notes;
