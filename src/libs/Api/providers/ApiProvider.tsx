import React, { createContext, useContext, useMemo } from 'react';
import ky, { Options } from 'ky';
import { KyInstance } from 'ky/distribution/types/ky';

export type ApiContextValue = {
    client: KyInstance;
    config: Options;
    onError: (error: unknown) => void;
    onTimeout: (error: unknown) => void;
    onUnauthorized: (error: unknown) => void;
};

const defaultApiContextValue: ApiContextValue = {
    client: ky.create({}),
    config: {},
    onError: (error) => {
        console.error('api is error.', error);
    },
    onTimeout: (error) => {
        console.error('api is timeout.', error);
    },
    onUnauthorized: (error) => {
        console.error('api is unauthorized.', error);
    },
};

const ApiContext = createContext(defaultApiContextValue);

type Props = {
    children: React.ReactNode;
    config: ApiContextValue['config'];
    onError?: ApiContextValue['onError']; // グローバル設定
    onTimeout?: ApiContextValue['onTimeout']; // グローバル設定
    onUnauthorized?: ApiContextValue['onUnauthorized']; // グローバル設定
};
const ApiProvider: React.FC<Props> = (props) => {
    const {
        children,
        config,
        onError = defaultApiContextValue.onError,
        onTimeout = defaultApiContextValue.onTimeout,
        onUnauthorized = defaultApiContextValue.onUnauthorized,
    } = props;

    const client = useMemo(() => ky.create(config), [config]);
    const value = useMemo(
        () => ({
            client,
            config,
            onError,
            onTimeout,
            onUnauthorized,
        }),
        [client, config]
    );

    return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};
export default ApiProvider;

export const useApiContext = () => {
    return useContext(ApiContext);
};
