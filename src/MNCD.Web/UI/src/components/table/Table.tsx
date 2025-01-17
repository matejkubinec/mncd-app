import { Key, ReactPortal } from 'react';
import { TableProps } from './Table.types';
import MuiTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const Table = <T,>({
  rowId,
  rows,
  columns,
  onRowClick,
  size = 'small',
}: TableProps<T>) => (
  <TableContainer
    sx={(theme) => ({
      borderWidth: 1,
      borderStyle: 'solid',
      borderRadius: 1,
      borderColor: theme.palette.divider,
      boxShadow: 'none',

      ['tbody tr:hover .row-actions']: {
        visibility: 'visible',
      },

      [`tbody tr:last-child .${tableCellClasses.root}`]: {
        border: 'none',
      },
    })}
  >
    <MuiTable>
      <TableHead>
        <TableRow>
          {columns.map((col) => (
            <TableCell size={size} key={col.id}>
              {col.name}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {!rows.length ? (
          <TableRow>
            <TableCell size={size} colSpan={columns.length} align='center'>
              No Data
            </TableCell>
          </TableRow>
        ) : (
          rows.map((row) => (
            <TableRow key={row[rowId] as Key} hover>
              {columns.map((col) => (
                <TableCell
                  size={size}
                  key={col.id || (col.field as Key)}
                  onClick={onRowClick ? () => onRowClick(row) : undefined}
                  sx={{
                    cursor: onRowClick ? 'pointer' : 'default',
                  }}
                >
                  {col.cell ? col.cell(row) : (row[col.field!] as ReactPortal)}
                </TableCell>
              ))}
            </TableRow>
          ))
        )}
      </TableBody>
    </MuiTable>
  </TableContainer>
);

export default Table;
