/**
 * Response Statusが400番台, 500番台であればエラー
 * @param status ステータスコード
 * @returns isError レスポンスエラーフラグ
 */
export const isApiError = (status: number) => ['4', '5'].includes(String(status)[0]);
