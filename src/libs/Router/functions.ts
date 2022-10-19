import { BaseRoute } from './type';
import { generatePath } from 'react-router-dom';

export const createRoute = <T extends Record<string, string> = Record<string, string>>(route: BaseRoute) => {
    const { name, ...routeProps } = route;
    return {
        name,
        ...routeProps,
        getPath: (params: T) => generatePath(route.path, params),
        getProps: () => routeProps,
    };
};
