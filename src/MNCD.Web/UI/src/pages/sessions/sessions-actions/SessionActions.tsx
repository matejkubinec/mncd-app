import { IconButton } from '@components/button';
import { Stack } from '@components/stack';
import { Session } from '@lib/types/session';
import { FC } from 'react';

interface Props {
  session: Session;
}

export const SessionActions: FC<Props> = ({ session }) => {
  return (
    <Stack flexDirection='row' gap={10} justifyContent='flex-end'>
      <IconButton name='cross1' onClick={() => {}} />
      <IconButton name='pencil1' to={`/sessions/${session.id}/edit`} />
      <IconButton name='enter' to='/' />
    </Stack>
  );
};
