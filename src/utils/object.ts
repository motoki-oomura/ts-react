
export const isObject = (value: unknown): value is object => {
    return value !== undefined
        && value !== null
        && typeof value === 'object'
        && !Array.isArray(value);
};

/**
 * 配列データを指定したkey名をオブジェクトのkeyとしてもつデータへ変換
 * example. [{ id: 1, name: 'hoge' }] => { "1": { id: 1, name: 'hoge' } }
 */
export const convertObjectData = <T extends object>(arr: T[], uniqueValueKey: keyof T): { [key: string]: T } => {
    return Object.fromEntries(arr.map((d) => [d[uniqueValueKey], d]));
};
