import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@components/button';
import { Stack } from '@components/stack';
import { InputControl } from '@components/input';
import { useAddSession } from '@hooks/api/session';
import { useNavigate } from 'react-router-dom';

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
    <div>
      <h2>Add Session</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack
          gap={10}
          flexDirection='column'
          sx={{
            width: '250px',
          }}
        >
          <InputControl label='Name' name='name' control={control} />
          <Button type='submit'>Add Session</Button>
        </Stack>
      </form>
    </div>
  );
};

interface AddSessionForm {
  name: string;
}
