import { Key, ReactPortal } from 'react';
import { ColumnAlign, TableProps } from './Table.types';
import { css, SerializedStyles } from '@emotion/react';

export const Table = <T,>({ rowId, rows, columns }: TableProps<T>) => (
  <div>
    <table css={styles.table}>
      <thead>
        <tr>
          {columns.map((col) => (
            <th
              key={col.id}
              css={[
                styles.th,
                col.width &&
                  css({
                    width: col.width,
                  }),
              ]}
            >
              {col.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {!rows.length ? (
          <tr>
            <td colSpan={columns.length} css={styles.td} align='center'>
              No Data
            </td>
          </tr>
        ) : (
          rows.map((row) => (
            <tr key={row[rowId] as Key} css={styles.tr}>
              {columns.map((col) => (
                <td
                  key={col.field as Key}
                  css={[styles.td, col.align && stylesAlign[col.align]]}
                >
                  {col.cell ? col.cell(row) : (row[col.field!] as ReactPortal)}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
);

const styles = {
  table: css({
    width: '100%',
    borderCollapse: 'collapse',
  }),
  tr: css({}),
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

const stylesAlign: Record<ColumnAlign, SerializedStyles> = {
  left: css({}),
  right: css({}),
  center: css({}),
};
