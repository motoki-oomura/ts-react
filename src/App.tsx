import React from 'react';
import { Routes } from '@libs/Router';
import ApiProvider from '@libs/Api/providers/ApiProvider';
import useAuth from '@libs/Auth/hooks/useAuth';
import useEffectOnce from '@hooks/useEffectOnce';
import { publicRoutes, demoRoutes, privateRoutes } from './routes';

function App() {
    const { initialized, authenticated, authenticate, deauthenticate } = useAuth();

    // 初回認証
    useEffectOnce(() => {
        // authenticate();
        deauthenticate();
    });

    return (
        <>
            <ApiProvider config={{}}>
                <Routes routes={publicRoutes} fallback='ページ読み込み中' />
                <Routes
                    routes={privateRoutes}
                    initialized={initialized}
                    authenticated={authenticated}
                    redirectPath={'/'}
                    loader={<div>now loading...</div>}
                    fallback='ページ読み込み中'
                />
                <Routes routes={demoRoutes} />
            </ApiProvider>
        </>
    );
}

export default App;
