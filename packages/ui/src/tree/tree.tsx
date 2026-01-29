import type { FC } from 'react';
import React, { useEffect, useState } from 'react';

import classNames from 'classnames';

import type { TreeDataNode, TreeProps } from './interface';
import './style';

const prefixCls = 'trontium-tree';

const Tree: FC<TreeProps> = ({
  className,
  style,
  treeData = [],
  defaultExpandedKeys = [],
  defaultSelectedKeys = [],
  selectedKeys: propSelectedKeys,
  multiple = false,
  onSelect,
  onExpand,
}) => {
  const [expandedKeys, setExpandedKeys] = useState<(string | number)[]>(defaultExpandedKeys);
  const [selectedKeys, setSelectedKeys] = useState<(string | number)[]>(defaultSelectedKeys);

  useEffect(() => {
    if (propSelectedKeys) {
      setSelectedKeys(propSelectedKeys);
    }
  }, [propSelectedKeys]);

  const handleExpand = (key: string | number, node: TreeDataNode) => {
    const newExpandedKeys = expandedKeys.includes(key)
      ? expandedKeys.filter((k) => k !== key)
      : [...expandedKeys, key];

    setExpandedKeys(newExpandedKeys);
    onExpand?.(newExpandedKeys, { expanded: !expandedKeys.includes(key), node });
  };

  const handleSelect = (e: React.MouseEvent, key: string | number, node: TreeDataNode) => {
    if (node.disabled) return;
    if (node.selectable === false) return; // Explicit false check

    let newSelectedKeys: (string | number)[];
    const isSelected = selectedKeys.includes(key);

    if (multiple) {
      newSelectedKeys = isSelected ? selectedKeys.filter((k) => k !== key) : [...selectedKeys, key];
    } else {
      newSelectedKeys = isSelected ? [] : [key];
    }

    if (!propSelectedKeys) {
      setSelectedKeys(newSelectedKeys);
    }

    onSelect?.(newSelectedKeys, {
      selected: !isSelected,
      selectedNodes: [], // TODO: implement finding nodes if needed
      node,
      event: e,
    });
  };

  const renderNodes = (nodes: TreeDataNode[]) => {
    return nodes.map((node) => {
      const isExpanded = expandedKeys.includes(node.key);
      const isSelected = selectedKeys.includes(node.key);
      const hasChildren = node.children && node.children.length > 0;

      return (
        <li
          key={node.key}
          className={classNames(`${prefixCls}-node`, {
            [`${prefixCls}-node-selected`]: isSelected,
          })}
        >
          <span
            className={classNames(`${prefixCls}-switcher`, {
              expanded: isExpanded,
              noop: !hasChildren,
            })}
            onClick={() => hasChildren && handleExpand(node.key, node)}
          >
            {hasChildren && (
              <svg
                viewBox="0 0 1024 1024"
                width="12"
                height="12"
                fill="currentColor"
                style={{ display: 'inline-block', verticalAlign: 'middle' }}
              >
                <path d="M288 192l448 320-448 320z" />
              </svg>
            )}
          </span>
          <span className={`${prefixCls}-title`} onClick={(e) => handleSelect(e, node.key, node)}>
            {node.title}
          </span>
          {hasChildren && isExpanded && (
            <ul className={`${prefixCls}-list`}>{renderNodes(node.children!)}</ul>
          )}
        </li>
      );
    });
  };

  return (
    <ul className={classNames(prefixCls, className)} style={style}>
      {renderNodes(treeData)}
    </ul>
  );
};

export default Tree;
