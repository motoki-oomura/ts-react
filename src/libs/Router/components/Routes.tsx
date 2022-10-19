import React, { Suspense } from 'react';
import { Route, RouteGuardProps } from '@libs/Router';
import { RouteGuard } from '@libs/Router';
import { Route as ReactRoute, Routes as ReactRoutes } from 'react-router-dom';

export type RoutesProps = Partial<Omit<RouteGuardProps, 'element'>> & {
    routes: Route[];
    fallback?: React.ReactNode;
};

export const Routes: React.FC<RoutesProps> = (props) => {
    const { routes, authenticated = true, initialized = true, redirectPath = '/', loader, fallback } = props;

    return (
        <Suspense fallback={fallback}>
            <ReactRoutes>
                {routes.map((r) => (
                    <ReactRoute
                        key={r.path}
                        {...r.getProps()}
                        element={
                            <RouteGuard
                                initialized={initialized}
                                authenticated={authenticated}
                                loader={loader}
                                redirectPath={redirectPath}
                                element={r.element}
                            />
                        }
                    />
                ))}
            </ReactRoutes>
        </Suspense>
    );
};
