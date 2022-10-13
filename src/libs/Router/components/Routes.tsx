import React from 'react';
import { getRoutes } from '../index';
import { Route, Routes as ReactRoutes } from 'react-router-dom';
import { Route as RouteType } from '../index';

export type Props = {
    types: {
        type: RouteType['type'];
        guard?: (element: unknown) => React.ReactNode | null;
    }[];
};

const Routes: React.FC<Props> = (props) => {
    const { types } = props;

    return (
        <ReactRoutes>
            {types.map(({ type, guard }) =>
                getRoutes(type).map((routeProps) => (
                    <Route key={routeProps.path} {...routeProps} element={guard ? guard(routeProps.element) : routeProps.element} />
                ))
            )}
        </ReactRoutes>
    );
};
export default Routes;
