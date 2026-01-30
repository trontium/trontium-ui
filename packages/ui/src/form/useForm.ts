// src/form/useForm.ts
import { useRef } from 'react';

import Schema from 'async-validator';
import type { ValidateError } from 'async-validator';

import type { Callbacks, FieldEntity, FormInstance, NamePath } from './interface';
import { deepMerge, getNamePath, getValue, setValue } from './utils';

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
    return getValue(this.store, name);
  };

  public getFieldError = (name: NamePath): string[] => {
    const namePathStr = getNamePath(name).join('.');
    return this.errors[namePathStr] ? this.errors[namePathStr].map((e) => e.message || '') : [];
  };

  public setFieldsValue = (newStore: Partial<Values>) => {
    this.store = deepMerge(this.store, newStore);

    // Notify registered fields
    this.updateFieldEntities();

    // Notify onValuesChange callback
    if (this.callbacks.onValuesChange) {
      this.callbacks.onValuesChange(newStore, this.store as Values);
    }
  };

  public resetFields = (names?: NamePath[]) => {
    const store = this.store as Record<string, any>;
    const resetNames = names || Object.keys(store); // This is weak for Nested, but acceptable for now

    resetNames.forEach((name) => {
      // Need handle nested reset if name is array
      const initialValue = getValue(this.initialValues, name);
      if (initialValue !== undefined) {
        setValue(store, name, initialValue);
      } else {
        // This delete only works for top level keys if name is string
        // For nested, setting undefined might be better
        setValue(store, name, undefined);
      }

      const namePathStr = getNamePath(name).join('.');
      delete this.errors[namePathStr];
    });

    this.updateFieldEntities();
  };

  private updateFieldEntities = () => {
    // changedValuesArg are typically top-level keys if from setFieldsValue
    // We need to notify if connection exists.
    // Simplification: just match strictly or if path includes.

    this.fieldEntities.forEach((entity) => {
      const namePath = entity.getNamePath();

      // Simple match for now: if any changed part matches
      // Ideally should check path intersection
      entity.onStoreChange(namePath);
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
    const initialVal = getValue(this.initialValues, name);

    if (name && getValue(this.store, name) === undefined && initialVal !== undefined) {
      setValue(this.store, name, initialVal);
    }

    return () => {
      this.fieldEntities = this.fieldEntities.filter((item) => item !== entity);
      if (name) {
        setValue(this.store, name, undefined);
        const namePathStr = getNamePath(name).join('.');
        delete this.errors[namePathStr];
      }
    };
  };

  public validateFields = async (): Promise<Values> => {
    const validatorDescriptor: any = {};
    const values: any = {};

    this.fieldEntities.forEach((entity) => {
      const name = entity.getNamePath();
      const rules = entity.props.rules;
      if (name && rules) {
        const namePathStr = getNamePath(name).join('.');
        validatorDescriptor[namePathStr] = rules;
        // Use setValue to construct the object for validation?
        // async-validator supports 'deep' descriptor keys like 'user.name'.
        // And we pass a flat object with keys 'user.name'? or nested?
        // Standard async-validator expects:
        //   descriptor: { address: { type: 'object', fields: { city: { required: true } } } }
        //   OR descriptor: { 'address.city': { required: true } }
        // Usage: validator.validate({ address: { city: '' } })

        // Let's use the 'user.name' string key approach which async-validator supports at top level
        // IF we provide a flat object to validate against.
        // But getFieldsValue returns nested.

        // Workaround: Validate nested by constructing nested object and using deep rules?
        // Simplest: use flat keys in descriptor and flat values object.

        values[namePathStr] = getValue(this.store, name);
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
      this.updateFieldEntities();
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
      this.updateFieldEntities();
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
    resetFields: this.resetFields,
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
