import { InputControl } from '@components/input';
import { Page } from '@components/page';
import { useUpdateDataset } from '@hooks/api/dataset';
import { useRouteDataset } from '@hooks/route';
import { EditDatasetForm, defaultValues } from '@lib/form/dataset-edit.form';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { enqueueSnackbar } from 'notistack';
import { FC, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';

export const EditDatasetPage: FC = () => {
  const { data: dataset } = useRouteDataset();
  const methods = useForm<EditDatasetForm>({
    defaultValues,
  });
  const { mutateAsync, isSuccess, isPending } = useUpdateDataset();

  const updateDataset = async (values: EditDatasetForm) =>
    mutateAsync(
      {
        id: dataset!.id!,
        ...values,
      },
      {
        onSuccess: () =>
          enqueueSnackbar('Dataset updated', { variant: 'success' }),
        onError: () =>
          enqueueSnackbar('There was a problem updating the dataset', {
            variant: 'error',
          }),
      },
    );

  useEffect(() => {
    if (dataset) {
      methods.setValue('name', dataset.name);
    }
  }, [dataset, methods]);

  if (isSuccess) {
    return <Navigate to='/datasets' />;
  }

  return (
    <Page
      title={dataset?.name ? `Edit ${dataset.name}` : undefined}
      backTo='/datasets'
    >
      <FormProvider {...methods}>
        <Stack
          gap={1}
          width={250}
          component='form'
          onSubmit={methods.handleSubmit(updateDataset)}
        >
          <InputControl
            label='Name'
            name='name'
            control={methods.control}
            rules={{
              required: 'Name is required',
            }}
          />
          <Button disabled={isPending} type='submit' variant='contained'>
            Edit
          </Button>
        </Stack>
      </FormProvider>
    </Page>
  );
};
