import { InputControl } from '@components/input';
import { Page } from '@components/page';
import { useUpdateSession } from '@hooks/api/session';
import { useRouteSession } from '@hooks/route/session';
import {
  defaultValues,
  EditSessionFormValues,
} from '@lib/form/edit-session.form';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useSnackbar } from 'notistack';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';

export const EditSessionPage: FC = () => {
  const session = useRouteSession();
  const { handleSubmit, setValue, control } = useForm<EditSessionFormValues>({
    defaultValues,
  });
  const { data, mutateAsync, isSuccess } = useUpdateSession();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (session.data) {
      setValue('id', session.data.id);
      setValue('name', session.data.name);
    }
  }, [session.data, setValue]);

  const editSession = (values: EditSessionFormValues) => {
    mutateAsync(values, {
      onSuccess: () =>
        enqueueSnackbar({
          message: `Session "${values.name}" updated`,
          variant: 'success',
        }),
      onError: () =>
        enqueueSnackbar({
          message: "Session couldn't be updated",
          variant: 'error',
        }),
    });
  };

  if (isSuccess) {
    return <Navigate to={`/sessions/${data.id}`} />;
  }

  return (
    <Page
      title={session.data ? `Editing ${session.data.name}` : ''}
      loading={session.isLoading}
      backTo='/'
    >
      <Stack
        gap={1}
        width={250}
        component='form'
        onSubmit={handleSubmit(editSession)}
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
          Edit
        </Button>
      </Stack>
    </Page>
  );
};
