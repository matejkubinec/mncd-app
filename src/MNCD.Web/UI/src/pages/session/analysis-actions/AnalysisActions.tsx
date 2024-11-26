import { FC, MouseEventHandler } from 'react';
import { AnalysisActionsProps } from './AnalysisActions.types';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

export const AnalysisActions: FC<AnalysisActionsProps> = () => {
  const removeAnalysis: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <Stack flexDirection='row' gap={1} justifyContent='flex-end'>
      <IconButton name='cross1' onClick={removeAnalysis} />
    </Stack>
  );
};
