import type { CSSProperties, FormHTMLAttributes, ReactNode } from 'react';

import type { Rule } from 'async-validator';

export type NamePath = string;

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

export interface FormInstance {
  getFieldValue: (name: NamePath) => any;
  getFieldsValue: () => any;
  setFieldsValue: (values: any) => void;
  getFieldError: (name: NamePath) => string[]; // Added this
  validateFields: () => Promise<any>;
  submit: () => void;
  getInternalHooks: () => {
    registerField: (entity: FieldEntity) => () => void;
    setInitialValues: (values: any, init: boolean) => void;
    setCallbacks: (callbacks: Callbacks) => void;
  };
}

export interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  form?: FormInstance;
  initialValues?: Record<string, any>;
  onFinish?: (values: any) => void;
  onFinishFailed?: (errorInfo: any) => void;
  onValuesChange?: (changedValues: any, values: any) => void;
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
