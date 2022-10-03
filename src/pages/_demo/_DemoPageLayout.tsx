import React from 'react';

type Props = {
    children: React.ReactNode;
};
const _DemoPageLayout: React.FC<Props> = (props) => {
    const { children } = props;
    return (
        <div>
            <h1>Demo Page</h1>
            {children}
        </div>
    );
};
export default _DemoPageLayout;
