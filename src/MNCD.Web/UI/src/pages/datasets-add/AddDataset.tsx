import { FileInputControl, InputControl } from '@components/input';
import { Page } from '@components/page';
import { SelectControl } from '@components/select';
import { useAddDataset } from '@hooks/api/dataset';
import { defaultValues, AddDatasetForm } from '@lib/form/dataset-add.form';
import { DatasetFormat } from '@lib/types/dataset';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useSnackbar } from 'notistack';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';

export const AddDatasetPage: FC = () => {
  const { control, handleSubmit } = useForm<AddDatasetForm>({
    defaultValues,
  });
  const { data, mutate, isSuccess } = useAddDataset();
  const { enqueueSnackbar } = useSnackbar();

  const addDataset = async (values: AddDatasetForm) => {
    const data = new FormData();

    data.append('name', values.name);
    data.append('file', values.file!);
    data.append('format', String(values.format));

    mutate(data, {
      onSuccess: () => enqueueSnackbar('Dataset added'),
      onError: (error) => enqueueSnackbar(error.message, { variant: 'error' }),
    });
  };

  if (isSuccess) {
    return <Navigate to={`/datasets/${data?.id}`} />;
  }

  return (
    <Page title='Add Dataset' backTo='/datasets'>
      <Stack
        gap={1}
        width={250}
        component='form'
        onSubmit={handleSubmit(addDataset)}
      >
        <InputControl
          label='Name'
          name='name'
          control={control}
          rules={{
            required: 'Name is required',
          }}
        />
        <SelectControl
          label='Format'
          name='format'
          control={control}
          options={[
            { label: 'MPX', value: DatasetFormat.MPX },
            { label: 'Edge List', value: DatasetFormat.EdgeList },
          ]}
          rules={{
            required: 'Format is required',
          }}
        />
        <FileInputControl label='File' name='file' control={control} />
        <Button type='submit' variant='contained'>
          Add Dataset
        </Button>
      </Stack>
    </Page>
  );
};
