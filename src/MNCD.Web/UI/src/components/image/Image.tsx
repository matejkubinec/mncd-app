import { FC, useCallback, useState } from 'react';
import { ImageProps } from './Image.types';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import BrokenImageIcon from '@mui/icons-material/BrokenImage';

export const Image: FC<ImageProps> = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleError = useCallback(() => {
    setIsLoading(false);
    setHasError(true);
  }, []);

  return (
    <Stack
      className={props.className}
      sx={{
        borderColor: '#aaa',
        borderWidth: 1,
        borderRadius: 1,
        borderStyle: 'dashed',
      }}
    >
      {isLoading && (
        <Stack flex='1' alignItems='center' justifyContent='center' gap={1}>
          <CircularProgress />
          <Typography textAlign='center'>Loading</Typography>
        </Stack>
      )}
      {hasError && (
        <Stack
          gap={1}
          flex='1'
          alignItems='center'
          justifyContent='center'
          py={2}
        >
          <BrokenImageIcon
            color='error'
            sx={{
              width: 30,
              height: 30,
            }}
          />
          <Typography variant='body2'>Could not load image</Typography>
        </Stack>
      )}
      <img
        onLoad={handleLoad}
        onError={handleError}
        css={[
          {
            width: '100%',
            height: '100%',
            display: hasError ? 'none' : 'inherit',
            visibility: isLoading ? 'hidden' : 'visible',
          },
        ]}
        src={props.src}
        alt={props.alt}
      />
    </Stack>
  );
};
