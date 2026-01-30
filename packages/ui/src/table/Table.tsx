// src/table/Table.tsx
import React from 'react';

import classNames from 'classnames';

import { VirtualList } from '../virtual-list';
import type { TableProps } from './interface';
import './style';

function Table<RecordType extends object = any>(props: TableProps<RecordType>) {
  const { className, style, columns = [], dataSource = [], rowKey = 'key', scroll } = props;
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

  if (scroll && scroll.y) {
    return (
      <div className={classNames(prefixCls, className)} style={style}>
        <div className={`${prefixCls}-header`} style={{ display: 'flex', borderBottom: '1px solid #f0f0f0', background: '#fafafa' }}>
          {columns.map((col, index) => (
            <div
              key={col.key || col.dataIndex || index}
              className={`${prefixCls}-cell ${prefixCls}-header-cell`}
              style={{ flex: 1, padding: 16, width: col.width, fontWeight: 500 }}
            >
              {col.title}
            </div>
          ))}
        </div>
        <VirtualList
          data={dataSource}
          height={scroll.y}
          itemHeight={55} // Default roughly matches padding 16px + text
          itemKey={getRowKey}
        >
          {(record, index) => (
            <div className={`${prefixCls}-row`} style={{ display: 'flex', borderBottom: '1px solid #f0f0f0' }}>
              {columns.map((col, colIndex) => {
                const cellKey = col.key || col.dataIndex || colIndex;
                let value = col.dataIndex ? (record as any)[col.dataIndex] : undefined;
                if (col.render) {
                  value = col.render(value, record, index);
                }
                return (
                  <div key={cellKey} className={`${prefixCls}-cell`} style={{ flex: 1, padding: 16, width: col.width }}>
                    {value}
                  </div>
                );
              })}
            </div>
          )}
        </VirtualList>
      </div>
    );
  }

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
