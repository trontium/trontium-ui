import type { FC } from 'react';
import React from 'react';

import classNames from 'classnames';

import { FormContext } from './context';
import FormItem from './FormItem';
import type { FormProps } from './interface';
import './style';
import { useForm } from './useForm';

const Form: FC<FormProps> & { Item: typeof FormItem; useForm: typeof useForm } = ({
  className,
  style,
  children,
  form,
  initialValues,
  onFinish,
  onFinishFailed,
  onValuesChange,
  ...rest
}) => {
  const prefixCls = 'trontium-form';
  const cls = classNames(prefixCls, className);

  const [formInstance] = useForm(form);

  formInstance.getInternalHooks().setCallbacks({
    onFinish,
    onFinishFailed,
    onValuesChange,
  });

  const mountRef = React.useRef(false);
  if (!mountRef.current) {
    if (initialValues) {
      formInstance.getInternalHooks().setInitialValues(initialValues, true);
    }
    mountRef.current = true;
  }

  return (
    <FormContext.Provider value={formInstance}>
      <form
        className={cls}
        style={style}
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          formInstance.submit();
        }}
        {...rest}
      >
        {children}
      </form>
    </FormContext.Provider>
  );
};

Form.Item = FormItem;
Form.useForm = useForm;

export default Form;
