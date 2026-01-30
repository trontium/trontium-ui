// packages/ui/src/form/utils.ts
import type { NamePath } from './interface';

export function toArray<T>(candidate?: T | T[] | false): T[] {
  if (candidate === undefined || candidate === false) return [];

  return Array.isArray(candidate) ? candidate : [candidate];
}

export function getNamePath(path: NamePath | null): (string | number)[] {
  if (!path) {
    return [];
  }
  return Array.isArray(path) ? path : [path];
}

export function getValue(store: any, namePath: NamePath) {
  const fields = getNamePath(namePath);
  let current = store;

  for (let i = 0; i < fields.length; i += 1) {
    const field = fields[i];
    if (typeof current !== 'object' || current === null) {
      return undefined;
    }
    current = current[field];
  }

  return current;
}

export function setValue(store: any, namePath: NamePath, value: any): any {
  const fields = getNamePath(namePath);
  const lastField = fields[fields.length - 1];
  const parents = fields.slice(0, -1);

  let target = store;
  if (!target) {
    target = {};
  }

  let current = target;
  parents.forEach((field) => {
    if (typeof current[field] === 'undefined' || current[field] === null) {
      // Future improvement: check if next field is number to create array
      current[field] = {};
    }
    current = current[field];
  });

  current[lastField] = value;
  return target;
}

function isObject(obj: any): boolean {
  return obj !== null && typeof obj === 'object' && !Array.isArray(obj);
}

export function deepMerge(target: any, source: any): any {
  if (!isObject(target) || !isObject(source)) {
    return source;
  }

  const output = { ...target };

  Object.keys(source).forEach((key) => {
    if (isObject(source[key])) {
      if (!(key in target)) {
        Object.assign(output, { [key]: source[key] });
      } else {
        output[key] = deepMerge(target[key], source[key]);
      }
    } else {
      Object.assign(output, { [key]: source[key] });
    }
  });
  return output;
}

export function cloneByNamePathList(store: any, namePathList: NamePath[]) {
  const newStore = {};
  namePathList.forEach((namePath) => {
    const value = getValue(store, namePath);
    setValue(newStore, namePath, value);
  });

  return newStore;
}
