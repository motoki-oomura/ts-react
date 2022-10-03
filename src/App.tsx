import React from 'react';
import RouteGuard from '@features/Router/components/RouteGuard';
import Routes from '@features/Router/components/Routes';
import './App.css';
import ApiProvider from '@features/Api/providers/ApiProvider';
import useAuth from '@features/Auth/hooks/useAuth';
import useEffectOnce from '@hooks/useEffectOnce';

function App() {
    const { initialized, authenticated, authenticate } = useAuth();

    const routeTypes = [
        { type: 'public' },
        {
            type: 'private',
            guard: (element: unknown) => (
                <RouteGuard
                    initialized={initialized}
                    authenticated={authenticated}
                    redirectPath={'/login'}
                    element={element}
                    loader={null}
                />
            ),
        },
        { type: '_demo' },
    ];

    // 初回認証
    useEffectOnce(() => {
        authenticate();
    });

    return (
        <>
            <ApiProvider config={{}}>
                <Routes types={routeTypes} />
            </ApiProvider>
        </>
    );
}

export default App;
