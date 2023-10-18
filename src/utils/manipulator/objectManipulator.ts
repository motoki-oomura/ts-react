import clone from 'just-clone';
import { isObject } from '@utils/object';

type ObjectManipulator<T> = {
  get: () => T;
  set: <K extends string | number | symbol, V>(key: K, value: V) => ObjectManipulator<T & { [key in K]: V }>;
  delete: <K extends keyof T>(key: K) => ObjectManipulator<Omit<T, K>>;
  merge: <U extends object>(obj: U) => ObjectManipulator<T & U>;

  if: (
    condition: boolean | ((chainable: ObjectManipulator<T>) => boolean),
    callback: (chainable: ObjectManipulator<T>) => void
  ) => ObjectManipulator<T>;
  elseif: (
    condition: boolean | ((chainable: ObjectManipulator<T>) => boolean),
    callback: (chainable: ObjectManipulator<T>) => void
  ) => ObjectManipulator<T>;
  else: (callback: (chainable: ObjectManipulator<T>) => void) => ObjectManipulator<T>;

  switchOn: <V>(value: V, callback: (chainable: ObjectManipulator<T>) => void) => ObjectManipulator<T>;
  case: <V>(value: V, callback: (chainable: ObjectManipulator<T>) => void) => ObjectManipulator<T>;
  default: (callback: (chainable: ObjectManipulator<T>) => void) => ObjectManipulator<T>;

  callback: (callback: (args: T) => T | void) => ObjectManipulator<T>;
};
export function objectManipulator<T extends object>(object: T): ObjectManipulator<T> {
  if (!isObject(object)) {
    throw new Error('Provided data is not an object.');
  }
  const data = clone(object);

  // if, elseif, else
  let conditionMet = false;

  // switchOn, case, default
  let switchValue: unknown = null;
  let caseMatched = false;

  const chainable: ObjectManipulator<T> = {
    // getter
    get: () => data,
    set: <K extends string | number | symbol, V>(key: K, value: V) => {
      return objectManipulator({ ...data, [key]: value } as T & { [key in K]: V });
    },
    delete: (key) => {
      const { [key]: _, ...rest } = data;
      return objectManipulator(rest);
    },
    merge: <U extends object>(obj: U) => {
      return objectManipulator({ ...data, ...obj } as T & U);
    },

    // original array functions

    // util array functions
    if: (condition, callback) => {
      conditionMet = false;
      if (typeof condition === 'function' ? condition(chainable) : condition) {
        conditionMet = true;
        callback(chainable);
      }
      return chainable;
    },
    elseif: (condition, callback) => {
      if (conditionMet) return chainable;
      if (typeof condition === 'function' ? condition(chainable) : condition) {
        conditionMet = true;
        callback(chainable);
      }
      return chainable;
    },
    else: (callback) => {
      if (conditionMet) return chainable;
      conditionMet = true;
      callback(chainable);
      return chainable;
    },
    switchOn: (value) => {
      caseMatched = false;
      switchValue = value;
      return chainable;
    },
    case: (value, callback) => {
      if (!caseMatched && value === switchValue) {
        caseMatched = true;
        callback(chainable);
      }
      return chainable;
    },
    default: (callback) => {
      if (!caseMatched) {
        callback(chainable);
      }
      return chainable;
    },
    callback: (callback) => objectManipulator(callback(data) ?? data),
  };

  return chainable;
}
