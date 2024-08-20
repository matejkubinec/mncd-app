import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@components/button';
import { Stack } from '@components/stack';
import { InputControl } from '@components/input';
import { useAddSession } from '@hooks/api/session';
import { useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';
import { Page } from '@components/page';

export const AddSessionPage: FC = () => {
  const { control, handleSubmit } = useForm<AddSessionForm>({
    values: {
      name: '',
    },
  });
  const { mutateAsync } = useAddSession();
  const navigate = useNavigate();

  const onSubmit = async (values: AddSessionForm) => {
    const res = await mutateAsync(values);

    if (res) {
      navigate('/');
    }
  };

  return (
    <Page title='Add Session' backTo='/'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={10} flexDirection='column' css={styles.form}>
          <InputControl label='Name' name='name' control={control} />
          <Button type='submit'>Add Session</Button>
        </Stack>
      </form>
    </Page>
  );
};

interface AddSessionForm {
  name: string;
}

const styles = {
  form: css({
    width: 250,
  }),
};
