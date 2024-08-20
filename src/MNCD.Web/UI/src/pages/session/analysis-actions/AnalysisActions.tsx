import { FC } from 'react';
import { AnalysisActionsProps } from './AnalysisActions.types';
import { Stack } from '@components/stack';
import { IconButton } from '@components/button';

export const AnalysisActions: FC<AnalysisActionsProps> = ({
  session,
  analysis,
}) => {
  return (
    <Stack flexDirection='row' gap={10} justifyContent='flex-end'>
      <IconButton name='cross1' onClick={() => {}} />
      <IconButton
        name='enter'
        to={`/session/${session.id}/analysis/${analysis.id}`}
      />
    </Stack>
  );
};
