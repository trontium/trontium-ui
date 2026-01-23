// src/form/useForm.ts
import { useRef } from 'react';

import Schema from 'async-validator';
import type { ValidateError } from 'async-validator';

import type { Callbacks, FieldEntity, FormInstance, NamePath } from './interface';

export class FormStore<Values = any> {
  private store: Partial<Values> = {};
  private errors: Record<string, ValidateError[]> = {};
  private fieldEntities: FieldEntity[] = [];
  private callbacks: Callbacks<Values> = {};
  private initialValues: Partial<Values> = {};

  // constructor() {}

  public getFieldsValue = () => {
    return { ...this.store } as Values;
  };

  public getFieldValue = (name: NamePath) => {
    return (this.store as any)[name];
  };

  public getFieldError = (name: NamePath): string[] => {
    return this.errors[name] ? this.errors[name].map((e) => e.message || '') : [];
  };

  public setFieldsValue = (newStore: Partial<Values>) => {
    this.store = {
      ...this.store,
      ...newStore,
    };

    // Notify registered fields
    this.updateFieldEntities(Object.keys(newStore));

    // Notify onValuesChange callback
    if (this.callbacks.onValuesChange) {
      this.callbacks.onValuesChange(newStore, this.store as Values);
    }
  };

  private updateFieldEntities = (names: NamePath[]) => {
    this.fieldEntities.forEach((entity) => {
      const name = entity.getNamePath();
      if (names.includes(name)) {
        entity.onStoreChange(name);
      }
    });
  };

  public setCallbacks = (newCallbacks: Callbacks<Values>) => {
    this.callbacks = {
      ...this.callbacks,
      ...newCallbacks,
    };
  };

  public setInitialValues = (initialValues: Partial<Values>, init: boolean) => {
    this.initialValues = initialValues || {};
    if (init) {
      this.store = { ...this.initialValues };
    }
  };

  public registerField = (entity: FieldEntity) => {
    this.fieldEntities.push(entity);
    const name = entity.getNamePath();
    if (
      name &&
      (this.store as any)[name] === undefined &&
      (this.initialValues as any)[name] !== undefined
    ) {
      (this.store as any)[name] = (this.initialValues as any)[name];
    }
    return () => {
      this.fieldEntities = this.fieldEntities.filter((item) => item !== entity);
      if (name) {
        delete (this.store as any)[name];
        delete this.errors[name];
      }
    };
  };

  public validateFields = async (): Promise<Values> => {
    const validatorDescriptor: any = {};
    const values: Record<string, any> = {};

    this.fieldEntities.forEach((entity) => {
      const name = entity.getNamePath();
      const rules = entity.props.rules;
      if (name && rules) {
        validatorDescriptor[name] = rules;
        values[name] = this.getFieldValue(name);
      }
    });

    const validator = new Schema(validatorDescriptor);

    // Clear previous errors for validated fields
    Object.keys(validatorDescriptor).forEach((name) => {
      delete this.errors[name];
    });

    try {
      await validator.validate(values);
      // Success: update UI to remove errors
      this.updateFieldEntities(Object.keys(validatorDescriptor));
      return Promise.resolve(this.getFieldsValue());
    } catch (e: any) {
      const { errors } = e;
      const errorMap: Record<string, ValidateError[]> = {};
      errors.forEach((error: ValidateError) => {
        if (error.field) {
          if (!errorMap[error.field]) errorMap[error.field] = [];
          errorMap[error.field].push(error);
        }
      });
      this.errors = { ...this.errors, ...errorMap };

      // Update UI for fields with errors
      this.updateFieldEntities(Object.keys(errorMap));
      return Promise.reject(errors);
    }
  };

  public submit = () => {
    this.validateFields()
      .then((values) => {
        if (this.callbacks.onFinish) {
          this.callbacks.onFinish(values);
        }
      })
      .catch((errors) => {
        if (this.callbacks.onFinishFailed) {
          this.callbacks.onFinishFailed(errors);
        }
      });
  };

  public getForm = (): FormInstance<Values> => ({
    getFieldValue: this.getFieldValue,
    getFieldsValue: this.getFieldsValue,
    setFieldsValue: this.setFieldsValue,
    getFieldError: this.getFieldError,
    validateFields: this.validateFields,
    submit: this.submit,
    getInternalHooks: () => ({
      registerField: this.registerField,
      setInitialValues: this.setInitialValues,
      setCallbacks: this.setCallbacks,
    }),
  });
}

export const useForm = <Values = any>(form?: FormInstance<Values>): [FormInstance<Values>] => {
  const formRef = useRef<FormInstance<Values> | null>(null);

  if (!formRef.current) {
    if (form) {
      formRef.current = form;
    } else {
      const formStore = new FormStore<Values>();
      formRef.current = formStore.getForm();
    }
  }
  return [formRef.current];
};
