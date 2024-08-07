import { Key, ReactPortal } from 'react';
import { TableProps } from './Table.types';
import { css } from '@emotion/react';

export const Table = <T,>({ rowId, rows, columns }: TableProps<T>) => {
  return (
    <div>
      <table css={styles.table}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.id} css={styles.th}>
                {col.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[rowId] as Key} css={styles.tr}>
              {columns.map((col) => (
                <td key={col.field as Key} css={styles.td}>
                  {col.cell ? col.cell(row) : (row[col.field] as ReactPortal)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  table: css({
    width: '100%',
    borderCollapse: 'collapse',
  }),
  th: css({
    textAlign: 'left',
    padding: '0.5em 0.25em',
    borderBottom: '1px solid #ccc',
  }),
  td: css({
    padding: '0.5em 0.25em',
    borderBottom: '1px solid #ccc',
  }),
};
