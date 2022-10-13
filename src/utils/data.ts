/**
 * 配列データを指定したkey名をオブジェクトのkeyとしてもつデータへ変換
 * example. [{ id: 1, name: 'hoge' }] => { "1": { id: 1, name: 'hoge' } }
 */
export const toIdObjectData = <T>(arr: T[], idKey: keyof T): { [key: string]: T } => {
    return Object.fromEntries(arr.map((d) => [d[idKey], d]));
};
