import { FC, MouseEventHandler } from 'react';
import { AnalysisActionsProps } from './AnalysisActions.types';
import { Stack } from '@components/stack';
import IconButton from '@mui/material/IconButton';

export const AnalysisActions: FC<AnalysisActionsProps> = () => {
  const removeAnalysis: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <Stack flexDirection='row' gap={10} justifyContent='flex-end'>
      <IconButton name='cross1' onClick={removeAnalysis} />
    </Stack>
  );
};
