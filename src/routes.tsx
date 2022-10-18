import React from 'react';
import { setRoutes, setTypeRoutes } from '@libs/Router';
import IndexPage from '@pages/IndexPage';

// demo
import DemoInfiniteScroll from '@pages/_demo/DemoInfiniteScroll';
import DemoPortal from '@pages/_demo/DemoPortal';
import DemoApi from '@pages/_demo/DemoApi';
import DemoPagination from '@pages/_demo/DemoPagination';
import DemoFormSignUpPage from '@pages/_demo/forms/DemoFormSignUp';
import DemoFormProfilePage from '@pages/_demo/forms/DemoFormProfile';
import {DemoI18nPage} from "@pages/_demo/DemoI18n";

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
    {
        path: '/_demo/forms/signup',
        element: (
            <>
                <DemoFormSignUpPage />
            </>
        ),
    },
    {
        path: '/_demo/forms/profile',
        element: (
            <>
                <DemoFormProfilePage />
            </>
        ),
    },
    {
        path: '/_demo/i18n',
        element: (
            <>
                <DemoI18nPage />
            </>
        ),
    },
]);
