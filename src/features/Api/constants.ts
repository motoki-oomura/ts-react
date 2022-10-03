export const Status = {
    Ok: 200,
    Created: 201,
    NoContent: 204,
    BadRequest: 400,
    Unauthorized: 401,
    Forbidden: 403,
    NotFound: 404,
    Timeout: 408,
    Conflict: 409,
    PayloadTooLarge: 413,
    TooManyRequests: 429,
};

export const DefaultMessage = {
    [Status.Ok]: '正常に処理されました。',
    [Status.Created]: 'リソースが作成されました。',
    [Status.NoContent]: '正常に処理されました。',
    [Status.BadRequest]: 'リクエストが正しくありません。',
    [Status.Unauthorized]: '認証されていません。',
    [Status.Forbidden]: '許可されていない操作です。',
    [Status.NotFound]: 'リソースが見つかりません。',
    [Status.Timeout]: 'タイムアウトしました。',
    [Status.Conflict]: '同じリソースが存在します。',
    [Status.PayloadTooLarge]: 'リクエストが大きすぎます。',
};
