import {useCallback, useMemo, useState} from "react";
import {ApiContextValue, isApiError, Status, useApiContext} from "@features/Api";
import {Options} from "ky";
import {KyInstance} from "ky/distribution/types/ky";
import {Input} from "ky/distribution/types/options";

type HttpClientMethod = KyInstance['get'] | KyInstance['post'] | KyInstance['put'] | KyInstance['delete'] | KyInstance['head'] | KyInstance['patch'];

type HookOptions = {
    onError?: ApiContextValue['onError'],
    onUnauthorized?: ApiContextValue['onUnauthorized'],
    onTimeout?: ApiContextValue['onUnauthorized']
};

const useApi = <T = unknown>({ onError, onUnauthorized, onTimeout}: HookOptions) => {
    const {
        client,
        onError: onErrorGlobal,
        onUnauthorized: onUnauthorizedGlobal,
        onTimeout: onTimeoutGlobal
    } = useApiContext();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<T | null>(null);
    const [status, setStatus] = useState<number | null>(null);
    const [error, setError] = useState<unknown | null>(null);
    const abortController = useMemo(() => new AbortController(), [client]); // canceller

    const reset = () => useCallback(() => {
        setData(null);
        setStatus(null);
        setError(null);
    },[]);
    const cancel = () => useCallback(() => abortController.abort(), [abortController]);

    const callApi = useCallback(async (fn: HttpClientMethod, path: Input, options: Options = {}) => {
        setLoading(true);
        let data = null;
        const response = await fn(path, { signal: abortController.signal, ...options});
        const { ok, status } = response;
        if (response && status) {
            data = await response.json<T>();
            ok ? setData(data) : setError(data);
            setStatus(status);

            if (status === Status.Timeout) {
                (onTimeout ?? onTimeoutGlobal)(data);
            } else if (status === Status.Unauthorized) {
                (onUnauthorized ?? onUnauthorizedGlobal)(data);
            } else if (isApiError(status)) {
                (onError ?? onErrorGlobal)(data);
            }
        } else {
            setData(null);
            setStatus(null);
            setError(null);
        }
        setLoading(false);

        return {
            ok,
            status,
            data: !isApiError(status) ? data : null,
            error: !isApiError(status) ? null : data,
        };

    }, [abortController]);

    const api = useMemo(() => {
        return {
            get: (path: Input, options?: Options) => callApi(client.get, path, options),
            post: (path: Input, json: unknown, options?: Options) => callApi(client.post, path, { json, ...options }),
            put: (path: Input, json: unknown, options?: Options) => callApi(client.put, path, { json, ...options }),
            delete: (path: Input, json: unknown, options?: Options) => callApi(client.delete, path, { json, ...options }),
            patch: (path: Input, json: unknown, options?: Options) => callApi(client.patch, path, { json, ...options }),
            head: (path: Input) => callApi(client.head, path),
        }
    }, [callApi]);

    return {
        api,
        reset,
        cancel,
        data,
        loading,
        error,
        status
    }
};
export default useApi;