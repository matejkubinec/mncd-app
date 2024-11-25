import { ReactElement } from 'react';

export interface TableProps<T> {
  rowId: keyof T;
  rows: T[];
  columns: Column<T>[];
  onRowClick?: (row: T) => void;
  size?: 'small' | 'medium';
}

export type ColumnAlign = 'left' | 'center' | 'right';

type ColumnCommon = {
  align?: ColumnAlign;
  width?: number;
};

type ColumnConditional<T> =
  | {
      id: string;
      field?: keyof T;
      name?: string;
      cell: (item: T) => ReactElement | string;
    }
  | {
      id?: string;
      field: keyof T;
      name: string;
      cell?: (item: T) => ReactElement | string;
    };

export type Column<T> = ColumnCommon & ColumnConditional<T>;
