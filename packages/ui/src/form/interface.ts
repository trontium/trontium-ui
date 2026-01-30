import type { CSSProperties, FormHTMLAttributes, ReactNode } from 'react';

import type { Rule } from 'async-validator';

export type NamePath = string | number | (string | number)[];

export interface Callbacks<Values = any> {
  onValuesChange?: (changedValues: any, values: Values) => void;
  onFinish?: (values: Values) => void;
  onFinishFailed?: (errorInfo: any) => void;
}

export interface FieldEntity {
  onStoreChange: (name?: NamePath) => void;
  getNamePath: () => NamePath;
  props: {
    name?: NamePath;
    rules?: Rule;
    [key: string]: any;
  };
}

export interface FormInstance<Values = any> {
  getFieldValue: (name: NamePath) => any;
  getFieldsValue: () => Values;
  setFieldsValue: (values: Partial<Values>) => void;
  resetFields: (names?: NamePath[]) => void;
  getFieldError: (name: NamePath) => string[]; // Added this
  validateFields: (nameList?: NamePath[]) => Promise<Values>;
  submit: () => void;
  getInternalHooks: () => {
    registerField: (entity: FieldEntity) => () => void;
    setInitialValues: (values: any, init: boolean) => void;
    setCallbacks: (callbacks: Callbacks<Values>) => void;
  };
}

export interface FormProps<Values = any>
  extends Omit<FormHTMLAttributes<HTMLFormElement>, 'onFinish'> {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  form?: FormInstance<Values>;
  initialValues?: Partial<Values>;
  onFinish?: (values: Values) => void;
  onFinishFailed?: (errorInfo: any) => void;
  onValuesChange?: (changedValues: any, values: Values) => void;
}

export interface FormItemProps {
  className?: string;
  style?: CSSProperties;
  label?: ReactNode;
  name?: NamePath;
  rules?: Rule;
  children?: ReactNode;
  valuePropName?: string;
  trigger?: string;
}
