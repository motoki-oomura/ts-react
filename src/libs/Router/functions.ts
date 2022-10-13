import { Route } from './type';
import { IS_DEVELOPMENT } from '@constants/env';

let routes: Route[] = [];

export const getRoutes = (type?: Route['type']) => {
    const filterRoutes = routes.filter((r) => IS_DEVELOPMENT || (r.type?.indexOf('_') !== 0 ?? true));
    if (type === undefined) return [...filterRoutes];
    return filterRoutes.filter(({ type: t }) => t === type);
};

export const setTypeRoutes = (type: Route['type'], routeArray: Route[]) => {
    setRoutes(routeArray.map((r) => ({ type, ...r })));
};

export const setRoutes = (routeArray: Route[]) => {
    routes = [...routes, ...routeArray];
};

export const setRoute = (route: Route) => {
    routes = [...routes, route];
};
