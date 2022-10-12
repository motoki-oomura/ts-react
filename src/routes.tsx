import React from 'react';
import { setRoutes, setTypeRoutes } from '@features/libs/Router';
import IndexPage from '@pages/IndexPage';

// demo
import DemoInfiniteScroll from '@pages/_demo/DemoInfiniteScroll';
import DemoPortal from '@pages/_demo/DemoPortal';
import DemoApi from '@pages/_demo/DemoApi';
import DemoPagination from '@pages/_demo/DemoPagination';

setRoutes([
    {
        type: 'public',
        path: '/',
        element: (
            <>
                <IndexPage />
            </>
        ),
    },
]);

setTypeRoutes('_demo', [
    {
        path: '/_demo/infinite-scroll',
        element: (
            <>
                <DemoInfiniteScroll />
            </>
        ),
    },
    {
        path: '/_demo/portal',
        element: (
            <>
                <DemoPortal />
            </>
        ),
    },
    {
        path: '/_demo/api',
        element: (
            <>
                <DemoApi />
            </>
        ),
    },
    {
        path: '/_demo/pagination',
        element: (
            <>
                <DemoPagination />
            </>
        ),
    },
]);
