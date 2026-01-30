export interface ColumnType<RecordType> {
  title?: React.ReactNode;
  key?: string;
  dataIndex?: string;
  render?: (value: any, record: RecordType, index: number) => React.ReactNode;
  width?: number | string;
}

export interface TableProps<RecordType> {
  columns?: ColumnType<RecordType>[];
  dataSource?: RecordType[];
  rowKey?: string | ((record: RecordType) => string);
  className?: string;
  style?: React.CSSProperties;
}
