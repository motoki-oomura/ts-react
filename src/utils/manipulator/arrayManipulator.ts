import { notEmpty } from '@utils/array';
import clone from 'just-clone';

type ArrayManipulator<T> = {
    get: () => T[];

    push: (...items: T[]) => ArrayManipulator<T>;
    pop: () => ArrayManipulator<T>;
    shift: () => ArrayManipulator<T>;
    map: <U>(mapper: (item: T, index: number) => U) => ArrayManipulator<U>;
    filter: (predicate: (value: T, index: number, array: T[]) => boolean) => ArrayManipulator<T>;
    sort: (compareFn: (a: T, b: T) => number) => ArrayManipulator<T>;

    if: (condition: boolean, callback: (chainable: ArrayManipulator<T>) => void) => ArrayManipulator<T>;
    elseif: (condition: boolean, callback: (chainable: ArrayManipulator<T>) => void) => ArrayManipulator<T>;
    else: (callback: (chainable: ArrayManipulator<T>) => void) => ArrayManipulator<T>;

    switchOn: <V>(value: V, callback: (chainable: ArrayManipulator<T>) => void) => ArrayManipulator<T>;
    case: <V>(value: V, callback: (chainable: ArrayManipulator<T>) => void) => ArrayManipulator<T>;
    default: (callback: (chainable: ArrayManipulator<T>) => void) => ArrayManipulator<T>;

    callback: (callback: (args: T[]) => T[] | void) => ArrayManipulator<T>;
    findReplace: (predicate: (item: T, index: number) => boolean, replacement: T) => ArrayManipulator<T>,
    remove: (predicate: (value: T, index: number, array: T[]) => boolean) => ArrayManipulator<T>;
    unique: () => ArrayManipulator<T>;
    notEmpty: () => ArrayManipulator<T>;
};
export function arrayManipulator<T>(array: T[]): ArrayManipulator<T> {
    const data = clone(array);
    // if, elseif, else
    let conditionMet = false;

    // switchOn, case, default
    let switchValue: unknown = null;
    let caseMatched = false;

    const chainable: ArrayManipulator<T> = {
        // getter
        get: () => data,

        // original array functions
        push: (...items) => arrayManipulator([...data, ...items]),
        pop: () => {
            data.pop();
            return arrayManipulator(data);
        },
        shift: () => {
            data.shift();
            return arrayManipulator(data);
        },
        map: (mapper) => arrayManipulator(data.map(mapper)),
        filter: (predicate) => arrayManipulator(data.filter(predicate)),
        sort: (compareFn) => arrayManipulator(data.sort(compareFn)),

        // util array functions
        if: (condition, callback) => {
            conditionMet = false;
            if (condition) {
                conditionMet = true;
                callback(chainable);
            }
            return chainable;
        },
        elseif: (condition, callback) => {
            if (conditionMet) return chainable;
            if (condition) {
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
        callback: (callback) => arrayManipulator(callback(data) ?? data),
        findReplace: (predicate, replacement) => {
            const result = data.map((d, i) => predicate(d, i) ? replacement : d);
            return arrayManipulator(result);
        },
        remove: (callback) => {
            return arrayManipulator(
                data.filter((value, index, array) => !callback(value, index, array))
            );
        },
        unique: () => {
            const seen = new Set<string>();
            const result = data.filter(item => {
                const serialized = JSON.stringify(item);
                if (seen.has(serialized)) {
                    return false;
                }
                seen.add(serialized);
                return true;
            });
            return arrayManipulator(result);
        },
        notEmpty: () => arrayManipulator(data.filter(notEmpty)),
    };

    return chainable;
}
