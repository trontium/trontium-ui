import type { FC, ReactElement } from 'react';
import React, { useContext, useEffect, useState } from 'react';

import classNames from 'classnames';

import { FormContext } from './context';
import type { FieldEntity, FormItemProps } from './interface';

const FormItem: FC<FormItemProps> = ({
  className,
  style,
  label,
  children,
  name,
  rules,
  valuePropName = 'value',
  trigger = 'onChange',
}) => {
  const prefixCls = 'trontium-form-item';
  const { getFieldValue, getFieldError, getInternalHooks, setFieldsValue } =
    useContext(FormContext);

  const [, forceUpdate] = useState({});

  useEffect(() => {
    if (name && getInternalHooks) {
      const onStoreChange = () => {
        forceUpdate({});
      };

      const entity: FieldEntity = {
        onStoreChange,
        getNamePath: () => name,
        props: { name, rules },
      };

      const unregister = getInternalHooks().registerField(entity);
      return unregister;
    }
  }, [name, rules, getInternalHooks]);

  let childNode = children;

  if (name && React.isValidElement(children)) {
    const value = getFieldValue ? getFieldValue(name) : undefined;
    const childProps = {
      [valuePropName]: value,
      [trigger]: (e: any) => {
        const newValue =
          e && e.target && typeof e.target === 'object' && valuePropName in e.target
            ? e.target[valuePropName]
            : e;

        if (setFieldsValue) {
          setFieldsValue({ [name]: newValue });
        }

        const originTrigger = (children as ReactElement<any>).props[trigger];
        if (originTrigger) {
          originTrigger(e);
        }
      },
    };
    childNode = React.cloneElement(children as ReactElement<any>, childProps);
  }

  const errors = name && getFieldError ? getFieldError(name) : [];

  return (
    <div className={classNames(prefixCls, className)} style={style}>
      {label && <div className={`${prefixCls}-label`}>{label}</div>}
      <div className={`${prefixCls}-control`}>
        {childNode}
        {errors.length > 0 && (
          <div className={`${prefixCls}-error`} style={{ color: 'red' }}>
            {errors.join(', ')}
          </div>
        )}
      </div>
    </div>
  );
};

export default FormItem;
