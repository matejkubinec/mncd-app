import { Image } from '@components/image';
import { Page } from '@components/page';
import { css } from '@emotion/react';
import { useDownloadDataset } from '@hooks/api/dataset';
import { useRouteDataset } from '@hooks/route';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { FC } from 'react';

export const DatasetDetail: FC = () => {
  const { data: dataset, isLoading } = useRouteDataset();
  const { download } = useDownloadDataset(dataset?.id);

  return (
    <Page
      title={dataset?.name}
      backTo='/datasets'
      loading={isLoading}
      right={
        <Button onClick={download} variant='contained'>
          Download
        </Button>
      }
    >
      <Stack direction='column' gap={1}>
        <Stack>
          <Typography variant='subtitle1'>Information</Typography>
          <table
            css={{
              width: 150,
              th: {
                fontWeight: 'normal',
                textAlign: 'start',
              },
              td: {
                textAlign: 'end',
              },
            }}
          >
            <tbody>
              <tr>
                <th>Nodes:</th>
                <td>{dataset?.nodeCount}</td>
              </tr>
              <tr>
                <th>Edges:</th>
                <td>{dataset?.edgeCount}</td>
              </tr>
              <tr>
                <th>Layers:</th>
                <td>{dataset?.layerCount}</td>
              </tr>
              <tr>
                <th>File Type:</th>
                <td>{dataset?.fileType}</td>
              </tr>
            </tbody>
          </table>
        </Stack>
        <Stack>
          <Typography variant='subtitle2'>Layers</Typography>
          {!dataset?.layerNames?.length ? (
            <Typography>No layers</Typography>
          ) : (
            <ol
              css={{
                margin: 0,
                columns: Math.ceil((dataset.layerNames.length || 0) / 10),
              }}
            >
              {dataset?.layerNames.map((name, idx) => (
                <li key={idx}>{name}</li>
              ))}
            </ol>
          )}
        </Stack>
        <Stack>
          <Typography variant='subtitle2'>Actors</Typography>
          {!dataset?.actorNames?.length ? (
            <Typography css={styles.noData}>No actors</Typography>
          ) : (
            <ol
              css={{
                margin: 0,
                columns: Math.ceil((dataset.actorNames.length || 0) / 10),
              }}
            >
              {dataset?.actorNames.map((name, idx) => (
                <li key={idx}>{name}</li>
              ))}
            </ol>
          )}
        </Stack>

        <Typography variant='subtitle1'>Visualizations</Typography>
        <Stack
          direction='row'
          gap={2}
          sx={{
            '& > *': {
              width: 500,
            },
          }}
        >
          <Stack gap={1}>
            <Typography variant='subtitle2'>Slices</Typography>
            <Image
              src={dataset?.slicesUrl}
              alt='Slices'
              css={{ height: 250 }}
            />
          </Stack>
          <Stack gap={1}>
            <Typography variant='subtitle2'>Diagonal</Typography>
            <Image
              src={dataset?.diagonalUrl}
              alt='Diagonal'
              css={{ height: 250 }}
            />
          </Stack>
        </Stack>
      </Stack>
    </Page>
  );
};

const styles = {
  information: css({
    width: 500,
  }),
  noData: css({
    margin: 0,
    padding: 0,
  }),
  table: css({
    th: {
      textAlign: 'left',
    },
  }),
  img: css({
    height: '25vh',
  }),
  download: css({
    width: 250,
  }),
  ol: css({
    margin: 0,
    columns: 2,
  }),
};
