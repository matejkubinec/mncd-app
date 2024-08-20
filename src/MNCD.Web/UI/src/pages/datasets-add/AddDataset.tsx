import { Button } from '@components/button';
import { FileInputControl, InputControl } from '@components/input';
import { Page } from '@components/page';
import { SelectControl } from '@components/select';
import { Stack } from '@components/stack';
import { css } from '@emotion/react';
import { useAddDataset } from '@hooks/api/dataset';
import { DatasetFormat } from '@lib/types/dataset';
import { useSnackbar } from 'notistack';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export const AddDatasetPage: FC = () => {
  const { control, handleSubmit } = useForm<AddDatasetForm>({
    values: {
      name: '',
      format: DatasetFormat.MPX,
    },
  });
  const { mutate } = useAddDataset();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const addDataset = async (values: AddDatasetForm) => {
    const data = new FormData();

    data.append('name', values.name);
    data.append('file', values.file!);
    data.append('format', String(values.format));

    mutate(data, {
      onSuccess: () => {
        enqueueSnackbar('Dataset added');

        navigate('/datasets');
      },
      onError: (error) => {
        enqueueSnackbar(error.message, { variant: 'error' });
      },
    });
  };

  return (
    <Page title='Add Dataset'>
      <form onSubmit={handleSubmit(addDataset)}>
        <Stack gap={10} flexDirection='column' css={styles.form}>
          <InputControl label='Name' name='name' control={control} />
          <SelectControl
            label='Format'
            name='format'
            control={control}
            options={[
              { label: 'MPX', value: DatasetFormat.MPX },
              { label: 'Edge List', value: DatasetFormat.EdgeList },
            ]}
          />
          <FileInputControl label='File' name='file' control={control} />
          <Button type='submit'>Add Dataset</Button>
        </Stack>
      </form>
    </Page>
  );
};

interface AddDatasetForm {
  name: string;
  format: DatasetFormat;
  file?: File;
}

const styles = {
  form: css({
    width: 250,
  }),
};
