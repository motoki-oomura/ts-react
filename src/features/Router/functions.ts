import {Route} from "@features/Router/type";

let routes: Route[] = [];

export const getRoutes = (type?: Route['type']) => {
    if (type === undefined) return [...routes];
    return routes.filter(({ type: t }) => t === type);
};

export const setRoutes = (routeArray: Route[]) => {
    routes = [...routes, ...routeArray];
};

export const setRoute = (route: Route) => {
    routes = [...routes, route];
};