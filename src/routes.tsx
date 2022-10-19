import React from 'react';
import { createRoute } from '@libs/Router';

import IndexPage from '@pages/IndexPage';
import DashboardPage from '@pages/DashboardPage';

// demo
const DemoInfiniteScroll = React.lazy(() => import('@pages/_demo/DemoInfiniteScroll'));
const DemoPortal = React.lazy(() => import('@pages/_demo/DemoPortal'));
const DemoApi = React.lazy(() => import('@pages/_demo/DemoApi'));
const DemoPagination = React.lazy(() => import('@pages/_demo/DemoPagination'));
const DemoFormSignUpPage = React.lazy(() => import('@pages/_demo/forms/DemoFormSignUp'));
const DemoFormProfilePage = React.lazy(() => import('@pages/_demo/forms/DemoFormProfile'));
const DemoI18nPage = React.lazy(() => import('@pages/_demo/DemoI18n'));

export const TOP = createRoute({
    name: 'TOP',
    path: '/',
    element: <IndexPage />,
});

export const Dashboard = createRoute({
    name: 'ダッシュボード(private)',
    path: '/dashboard',
    element: <DashboardPage />,
});

export const DEMO_INFINITE_SCROLL = createRoute({
    name: 'DEMO_無限スクロール',
    path: '/_demo/infinite-scroll',
    element: <DemoInfiniteScroll />,
});

export const DEMO_USE_PORTAL = createRoute({
    name: 'DEMO_usePortal',
    path: '/_demo/portal',
    element: <DemoPortal />,
});

export const DEMO_API = createRoute({
    name: 'DEMO_API機能',
    path: '/_demo/api',
    element: <DemoApi />,
});

export const DEMO_PAGINATION = createRoute({
    name: 'DEMO_ページネーション',
    path: '/_demo/pagination',
    element: <DemoPagination />,
});

export const DEMO_FORM_SIGNUP = createRoute({
    name: 'DEMO_フォーム_サインアップ',
    path: '/_demo/forms/signup',
    element: <DemoFormSignUpPage />,
});

export const DEMO_FORM_PROFILE = createRoute({
    name: 'DEMO_フォーム_プロフィール',
    path: '/_demo/forms/profile',
    element: <DemoFormProfilePage />,
});

export const DEMO_I18N = createRoute({
    name: 'DEMO_言語切り替え',
    path: '/_demo/i18n',
    element: <DemoI18nPage />,
});

export const publicRoutes = [TOP];

export const privateRoutes = [Dashboard];

export const demoRoutes = [DEMO_INFINITE_SCROLL, DEMO_USE_PORTAL, DEMO_API, DEMO_PAGINATION, DEMO_FORM_SIGNUP, DEMO_FORM_PROFILE, DEMO_I18N];
