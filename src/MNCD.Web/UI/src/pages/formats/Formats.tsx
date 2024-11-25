import { FC } from 'react';
import { Page } from '@components/page';
import { Code } from '@components/code';
import { Image } from '@components/image';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { FORMATS_SAMPLES } from './Formats.constants';

export const FormatsPage: FC = () => (
  <Page title='Supported Formats'>
    <Stack direction='column' gap={1}>
      <Typography variant='subtitle1'>Edge List</Typography>
      <Typography>
        Data in edgelist format need to be supplied in following format:
      </Typography>
      <Code>{FORMATS_SAMPLES.edgeList}</Code>
      <Typography>
        File can also include metadata after the edgelist in following format:
      </Typography>
      <Code>{FORMATS_SAMPLES.edgeListMetadata}</Code>
      <Typography variant='subtitle2'>Example</Typography>
      <Stack
        direction='row'
        gap={2}
        sx={{
          '& > *': {
            flex: 1,
            height: 250,
          },
        }}
      >
        <Code>{FORMATS_SAMPLES.edgeListExample}</Code>
        <Image src='/images/edgelist-example.svg' />
      </Stack>
      <Typography variant='subtitle1'>MPX</Typography>
      <Typography>
        More info on this format{' '}
        <Link
          href='https://rdrr.io/cran/multinet/man/IO.html'
          target='_blank'
          rel='noopener noreferrer'
        >
          here
        </Link>
        .
      </Typography>
      <Typography variant='subtitle2'>Example</Typography>
      <Stack
        direction='row'
        gap={2}
        sx={{
          '& > *': {
            flex: 1,
            height: 250,
          },
        }}
      >
        <Code>{FORMATS_SAMPLES.mpx}</Code>
        <Image src='/images/mpx-example.svg' />
      </Stack>
    </Stack>
  </Page>
);
