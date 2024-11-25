import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { InputControl } from '@components/input';
import { useAddSession } from '@hooks/api/session';
import { Navigate } from 'react-router-dom';
import { Page } from '@components/page';
import Button from '@mui/material/Button';
import { useSnackbar } from 'notistack';
import Stack from '@mui/material/Stack';
import {
  defaultValues,
  AddSessionFormValues,
} from '@lib/form/add-session.form';

export const AddSessionPage: FC = () => {
  const { control, handleSubmit } = useForm<AddSessionFormValues>({
    defaultValues,
  });
  const { data, mutateAsync, isSuccess } = useAddSession();
  const { enqueueSnackbar } = useSnackbar();

  const addSession = async (values: AddSessionFormValues) => {
    mutateAsync(values, {
      onSuccess: () =>
        enqueueSnackbar({
          message: `Session "${values.name}" added`,
          variant: 'success',
        }),
      onError: () =>
        enqueueSnackbar({
          message: `Session "${values.name}" couldn't be added`,
          variant: 'error',
        }),
    });
  };

  if (isSuccess) {
    return <Navigate to={`/sessions/${data.id}`} />;
  }

  return (
    <Page title='Add Session' backTo='/'>
      <Stack
        gap={1}
        width={250}
        component='form'
        onSubmit={handleSubmit(addSession)}
      >
        <InputControl
          label='Name'
          name='name'
          control={control}
          rules={{
            required: 'Name is required',
          }}
        />
        <Button type='submit' variant='contained'>
          Add Session
        </Button>
      </Stack>
    </Page>
  );
};
