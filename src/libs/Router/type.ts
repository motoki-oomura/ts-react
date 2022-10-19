import { RouteProps } from 'react-router-dom';
import { createRoute } from '@libs/Router';

export type BaseRoute = RouteProps & {
    name: string;
    path: string;
};
export type Route = ReturnType<typeof createRoute>;
