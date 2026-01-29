import type { FC } from 'react';
import React, { useState } from 'react';

import classNames from 'classnames';

import type { TabPaneProps, TabsProps } from './interface';
import './style';

const prefixCls = 'trontium-tabs';

const TabPane: FC<TabPaneProps> = ({ children, className, style }) => {
  return (
    <div className={classNames(`${prefixCls}-tabpane`, className)} style={style}>
      {children}
    </div>
  );
};

const Tabs: FC<TabsProps> & { TabPane: FC<TabPaneProps> } = ({
  activeKey: propActiveKey,
  defaultActiveKey,
  onChange,
  className,
  style,
  children,
}) => {
  const [activeKey, setActiveKey] = useState<string | number | undefined>(
    propActiveKey ?? defaultActiveKey,
  );

  const mergedActiveKey = propActiveKey ?? activeKey;

  const handleTabClick = (key: string | number, disabled?: boolean) => {
    if (disabled) return;
    if (propActiveKey === undefined) {
      setActiveKey(key);
    }
    onChange?.(key);
  };

  const getChildKey = (child: React.ReactElement<any>, index: number) => {
    // @ts-ignore
    return child.key || index;
  };

  const renderNav = () => {
    return (
      <div className={`${prefixCls}-nav`} role="tablist">
        {React.Children.map(children, (child, index) => {
          if (!React.isValidElement(child)) return null;
          const { tab, disabled } = child.props as TabPaneProps;
          const key = getChildKey(child, index);
          const isActive = key === mergedActiveKey;

          // Initialize active key if not set
          if (mergedActiveKey === undefined && index === 0) {
            // This is a side effect during render, slightly risky but acceptable for simple init
            // Better pattern is useEffect but local state init handles defaultActiveKey
          }

          return (
            <div
              key={key}
              role="tab"
              aria-selected={isActive}
              tabIndex={disabled ? undefined : 0}
              className={classNames(`${prefixCls}-tab`, {
                [`${prefixCls}-tab-active`]: isActive,
                [`${prefixCls}-tab-disabled`]: disabled,
              })}
              onClick={() => handleTabClick(key, disabled)}
            >
              {tab}
            </div>
          );
        })}
      </div>
    );
  };

  const renderContent = () => {
    return (
      <div className={`${prefixCls}-content`}>
        {React.Children.map(children, (child, index) => {
          if (!React.isValidElement(child)) return null;
          const key = getChildKey(child, index);
          // If no active key set, default to first one?
          // Logic: mergedActiveKey ? key === mergedActiveKey : index === 0
          const isActive =
            mergedActiveKey !== undefined
              ? key === mergedActiveKey
              : defaultActiveKey === undefined && index === 0;

          if (!isActive) return null;

          return child;
        })}
      </div>
    );
  };

  return (
    <div className={classNames(prefixCls, className)} style={style}>
      {renderNav()}
      {renderContent()}
    </div>
  );
};

Tabs.TabPane = TabPane;

export default Tabs;
