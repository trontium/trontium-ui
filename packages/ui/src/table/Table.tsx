// src/table/Table.tsx
import React from 'react';

import classNames from 'classnames';

import type { TableProps } from './interface';
import './style';

import { VirtualList } from '../virtual-list';

function Table<RecordType extends object = any>(props: TableProps<RecordType>) {
  const { className, style, columns = [], dataSource = [], rowKey = 'key', scroll } = props;
  const prefixCls = 'trontium-table';

  const getRowKey = (record: RecordType, index: number) => {
    if (typeof rowKey === 'function') {
      return rowKey(record);
    }
    return (record as any)[rowKey as string] || index;
  };

  // Calculate sticky offsets
  const stickyOffsets = React.useMemo(() => {
    const leftOffsets: number[] = [];
    const rightOffsets: number[] = [];
    let left = 0;

    columns.forEach((col) => {
      if (col.fixed === 'left') {
        leftOffsets.push(left);
        left += Number(col.width) || 0;
      } else {
        leftOffsets.push(-1);
      }
    });

    let right = 0;
    for (let i = columns.length - 1; i >= 0; i--) {
      const col = columns[i];
      if (col.fixed === 'right') {
        rightOffsets[i] = right;
        right += Number(col.width) || 0;
      } else {
        rightOffsets[i] = -1;
      }
    }

    return { left: leftOffsets, right: rightOffsets };
  }, [columns]);

  const getCellStyle = (col: typeof columns[0], index: number, baseStyle?: React.CSSProperties) => {
    const cellStyle: React.CSSProperties = { ...baseStyle };

    // For flex layouts (VirtualList), width handling is crucial
    if (col.width) {
      cellStyle.flex = 'none';
      cellStyle.width = col.width;
    } else if (!scroll?.y) {
      // In basic table mode without scroll, allow auto width usually
      // but strictly speaking for sticky to work we prefer explicit widths
    } else {
      cellStyle.flex = 1;
    }

    if (col.fixed === 'left') {
      cellStyle.position = 'sticky';
      cellStyle.left = stickyOffsets.left[index];
      cellStyle.zIndex = 2; // Higher than normal content
    }
    if (col.fixed === 'right') {
      cellStyle.position = 'sticky';
      cellStyle.right = stickyOffsets.right[index];
      cellStyle.zIndex = 2;
    }
    return cellStyle;
  };

  const renderHeader = () => {
    return (
      <thead className={`${prefixCls}-thead`}>
        <tr>
          {columns.map((col, index) => (
            <th
              key={col.key || col.dataIndex || index}
              className={classNames(`${prefixCls}-cell`, {
                [`${prefixCls}-cell-fix-left`]: col.fixed === 'left',
                [`${prefixCls}-cell-fix-right`]: col.fixed === 'right',
              })}
              style={getCellStyle(col, index)}
            >
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
        <div
          className={`${prefixCls}-header`}
          style={{
            display: 'flex',
            borderBottom: '1px solid var(--trontium-table-border)',
            background: 'var(--trontium-table-header-bg)',
            position: 'sticky',
            top: 0,
            zIndex: 3,
            overflow: 'hidden',
          }}
        >
          {columns.map((col, index) => (
            <div
              key={col.key || col.dataIndex || index}
              className={classNames(`${prefixCls}-cell ${prefixCls}-header-cell`, {
                [`${prefixCls}-cell-fix-left`]: col.fixed === 'left',
                [`${prefixCls}-cell-fix-right`]: col.fixed === 'right',
              })}
              style={getCellStyle(col, index, {
                padding: 16,
                fontWeight: 500,
                background: 'var(--trontium-table-header-bg)',
              })}
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
          {(record: RecordType, index: number) => (
            <div
              className={`${prefixCls}-row`}
              style={{
                display: 'flex',
                borderBottom: '1px solid var(--trontium-table-border)',
                background: 'var(--trontium-color-bg-container)',
              }}
            >
              {columns.map((col, colIndex) => {
                const cellKey = col.key || col.dataIndex || colIndex;
                let value = col.dataIndex ? (record as any)[col.dataIndex] : undefined;
                if (col.render) {
                  value = col.render(value, record, index);
                }
                return (
                  <div
                    key={cellKey}
                    className={classNames(`${prefixCls}-cell`, {
                      [`${prefixCls}-cell-fix-left`]: col.fixed === 'left',
                      [`${prefixCls}-cell-fix-right`]: col.fixed === 'right',
                    })}
                    style={getCellStyle(col, colIndex, {
                      padding: 16,
                      background: 'var(--trontium-color-bg-container)',
                    })}
                  >
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
                  <td
                    key={cellKey}
                    className={classNames(`${prefixCls}-cell`, {
                      [`${prefixCls}-cell-fix-left`]: col.fixed === 'left',
                      [`${prefixCls}-cell-fix-right`]: col.fixed === 'right',
                    })}
                    style={getCellStyle(col, colIndex, {
                      background: 'var(--trontium-color-bg-container)',
                    })}
                  >
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
