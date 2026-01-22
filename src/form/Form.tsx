import React, { FC } from 'react';
import classNames from 'classnames';
import { FormProps } from './interface';
import { FormContext } from './context';
import FormItem from './FormItem';

const Form: FC<FormProps> & { Item: typeof FormItem } = ({
  className,
  style,
  children,
  ...rest
}) => {
  const prefixCls = 'trontium-form';
  const cls = classNames(prefixCls, className);

  return (
    <FormContext.Provider value={{}}>
      <form className={cls} style={style} {...rest}>
        {children}
      </form>
    </FormContext.Provider>
  );
};

Form.Item = FormItem;

export default Form;
