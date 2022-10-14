import React from 'react';
import { HelmetProvider } from 'react-helmet-async';

type Props = {
    children: React.ReactNode;
};
export const HeadProvider: React.FC<Props> = (props) => {
    const { children } = props;
    return <HelmetProvider>{children}</HelmetProvider>;
};
