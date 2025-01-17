import { FC, useCallback, useState } from 'react';
import { ImageProps } from './Image.types';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import BrokenImageIcon from '@mui/icons-material/BrokenImage';
import { common, grey } from '@mui/material/colors';

const Image: FC<ImageProps> = ({ rounded = true, ...props }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleError = useCallback(() => {
    setIsLoading(false);
    setHasError(true);
  }, []);

  // todo: add option to view the image fullscreen
  return (
    <Stack
      className={props.className}
      sx={(theme) => ({
        color: common['black'],
        borderWidth: 1,
        borderStyle: 'dashed',
        borderRadius: rounded ? 1 : 0,
        borderColor: grey['500'],
        backgroundColor: common['white'],

        ...theme.applyStyles('dark', {
          color: common['black'],
          border: 'none',
          backgroundColor: common['white'],
        }),
      })}
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

export default Image;
