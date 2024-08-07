import { ReactElement } from 'react';

export interface TableProps<T> {
  rowId: keyof T;
  rows: T[];
  columns: Column<T>[];
}

export interface Column<T> {
  id: string;
  field: keyof T;
  name: string;
  cell?: (item: T) => ReactElement | string;
}
