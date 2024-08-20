import { FC } from 'react';
import { Page } from '@components/page';
import { Stack } from '@components/stack';
import { css } from '@emotion/react';
import { Code } from '@components/code';
import { Image } from '@components/image';

export const FormatsPage: FC = () => (
  <Page title='Supported Formats'>
    <Stack flexDirection='row' gap={25}>
      <Stack flexDirection='column' css={styles.aside} gap={10}>
        <h3>Edge List</h3>
        <p>Data in edgelist format need to be supplied in following format:</p>
        <Code>{samples.edgeList}</Code>
        <p>
          File can also include metadata after the edgelist in following format:
        </p>
        <Code>{samples.edgeListMetadata}</Code>
        <h4>Example</h4>
        <Code>{samples.edgeListExample}</Code>
        <Image src='/images/edgelist-example.svg' />
      </Stack>
      <Stack css={styles.edgeList} />
      <Stack flexDirection='column' css={styles.aside} gap={10}>
        <h3>MPX</h3>
        <p>
          More info on this format{' '}
          <a
            href='https://rdrr.io/cran/multinet/man/IO.html'
            target='_blank'
            rel='noopener noreferrer'
          >
            here
          </a>
          .
        </p>
        <h4>Example</h4>
        <Code>{samples.mpx}</Code>
        <Image src='/images/mpx-example.svg' />
      </Stack>
    </Stack>
  </Page>
);

const styles = {
  aside: css({
    width: '50%',
  }),
  edgeList: css({
    borderRightWidth: 1,
    borderRightColor: '#ccc',
    borderRightStyle: 'dashed',
  }),
};

const samples = {
  edgeList: `
actor_from layer_from actor_to layer_to edge_weight
`.trim(),
  edgeListMetadata: `
# Actors
actor_index actor_name
...
# Layers
layer_index layer_name
...
`.trim(),
  edgeListExample: `
0 0 1 0 1
0 1 1 1 1
0 0 1 1 1

# Actors
0 Actor0
1 Actor1

# Layers
0 Layer0
1 Layer1
`.trim(),
  mpx: `
#TYPE multiplex
#LAYERS
Layer1,UNDIRECTED
Layer2,UNDIRECTED
#ACTORS
Actor1
Actor2
#EDGES
Actor1,Actor2,Layer1,1
Actor1,Actor2,Layer2,1
`.trim(),
};
