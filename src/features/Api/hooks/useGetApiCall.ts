import useApi, { UseApiHookOptions } from '@features/Api/hooks/useApi';
import { Input, Options } from 'ky/distribution/types/options';
import { EffectCallback, useEffect, useRef } from 'react';

const useEffectOnce = (effectCallback: EffectCallback) => {
    const onceRef = useRef(false);

    useEffect(() => {
        if (onceRef.current) return;
        const cleanup = effectCallback();
        return () => {
            onceRef.current = true;
            cleanup && cleanup();
        };
    }, []);
};

type UseGetApiCall = Partial<{
    getOptions: Options;
    hookOptions: UseApiHookOptions;
}>;

const useGetApiCall = <T = unknown>(url: Input, options?: UseGetApiCall) => {
    const { api, ...otherApi } = useApi<T>();

    useEffectOnce(() => {
        api.get(url, options?.getOptions);
    });
    return otherApi;
};
export default useGetApiCall;
