// src/table/Table.tsx
import React from 'react';

import classNames from 'classnames';

import type { TableProps } from './interface';

function Table<RecordType extends object = any>(props: TableProps<RecordType>) {
  const { className, style, columns = [], dataSource = [], rowKey = 'key' } = props;
  const prefixCls = 'trontium-table';

  const getRowKey = (record: RecordType, index: number) => {
    if (typeof rowKey === 'function') {
      return rowKey(record);
    }
    return (record as any)[rowKey as string] || index;
  };

  const renderHeader = () => {
    return (
      <thead className={`${prefixCls}-thead`}>
        <tr>
          {columns.map((col, index) => (
            <th key={col.key || col.dataIndex || index} className={`${prefixCls}-cell`}>
              {col.title}
            </th>
          ))}
        </tr>
      </thead>
    );
  };

  const renderBody = () => {
    if (!dataSource || dataSource.length === 0) {
      return (
        <tbody>
          <tr>
            <td colSpan={columns.length} className={`${prefixCls}-empty`}>
              No Data
            </td>
          </tr>
        </tbody>
      );
    }

    return (
      <tbody className={`${prefixCls}-tbody`}>
        {dataSource.map((record, index) => {
          const key = getRowKey(record, index);
          return (
            <tr key={key} className={`${prefixCls}-row`}>
              {columns.map((col, colIndex) => {
                const cellKey = col.key || col.dataIndex || colIndex;
                let value = col.dataIndex ? (record as any)[col.dataIndex] : undefined;
                if (col.render) {
                  value = col.render(value, record, index);
                }
                return (
                  <td key={cellKey} className={`${prefixCls}-cell`}>
                    {value}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    );
  };

  return (
    <div className={classNames(prefixCls, className)} style={style}>
      <table>
        {renderHeader()}
        {renderBody()}
      </table>
    </div>
  );
}

export default Table;
