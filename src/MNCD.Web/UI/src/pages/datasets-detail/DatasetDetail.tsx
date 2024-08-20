import { Button } from '@components/button';
import { Image } from '@components/image';
import { Page } from '@components/page';
import { Stack } from '@components/stack';
import { css } from '@emotion/react';
import { useDownloadDataset } from '@hooks/api/dataset';
import { useRouteDataset } from '@hooks/route';
import { FC } from 'react';

export const DatasetDetail: FC = () => {
  const { data: dataset, isLoading } = useRouteDataset();
  const { download } = useDownloadDataset(dataset?.id);

  return (
    <Page title={dataset?.name} backTo='/datasets' loading={isLoading}>
      <Stack flexDirection='row' gap={50}>
        <Stack flexDirection='column' gap={10} css={styles.information}>
          <h3>Information</h3>
          <Stack flexDirection='column'>
            <table css={styles.table}>
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
          <Stack flexDirection='column'>
            <h4>Layers</h4>
            {!dataset?.layerNames?.length ? (
              <p css={styles.noData}>No layers</p>
            ) : (
              <ol>
                {dataset?.layerNames.map((name, idx) => (
                  <li key={idx}>{name}</li>
                ))}
              </ol>
            )}
          </Stack>
          <Stack flexDirection='column'>
            <h4>Actors</h4>
            {!dataset?.actorNames?.length ? (
              <p css={styles.noData}>No actors</p>
            ) : (
              <ol css={styles.ol}>
                {dataset?.actorNames.map((name, idx) => (
                  <li key={idx}>{name}</li>
                ))}
              </ol>
            )}
          </Stack>
          <Button css={styles.download} onClick={download}>
            Download
          </Button>
        </Stack>
        <Stack flexDirection='column' gap={10} justifyContent='flex-start'>
          <h3>Visualizations</h3>
          <Stack flexDirection='column' gap={10}>
            <h4>Slices</h4>
            <Image src={dataset?.slicesUrl} alt='Slices' css={styles.img} />
            <h4>Diagonal</h4>
            <Image src={dataset?.diagonalUrl} alt='Diagonal' css={styles.img} />
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
    columns: 2,
  }),
};
