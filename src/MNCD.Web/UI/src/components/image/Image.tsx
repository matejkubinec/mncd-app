import { FC, useCallback, useState } from 'react';
import { ImageProps } from './Image.types';
import { Stack } from '@components/stack';
import { Icon } from '@components/icon';
import { css } from '@emotion/react';

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
      css={styles.container}
      className={props.className}
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
    >
      {isLoading && <Stack>Loading . . . </Stack>}
      {hasError && (
        <>
          <Icon name='exclamation-triangle' width={75} height={75} />
          <p css={styles.description}>Could not load image</p>
        </>
      )}
      <img
        onLoad={handleLoad}
        onError={handleError}
        css={[
          {
            display: hasError ? 'none' : 'inherit',
            visibility: isLoading ? 'hidden' : 'visible',
          },
          styles.image,
        ]}
        src={props.src}
        alt={props.alt}
      />
    </Stack>
  );
};

const styles = {
  container: css({
    padding: 5,
    borderColor: '#aaa',
    borderWidth: 1,
    borderRadius: 4,
    borderStyle: 'dotted',
  }),
  description: css({
    margin: 0,
  }),
  image: css({
    width: '100%',
    height: '100%',
  }),
};
