import React, { Helmet } from 'react-helmet-async';

type Props = {
    title?: string;
    description?: string;
    url?: string;
};

export const Head = (props: Props) => {
    const { title = '', description = '', url } = props;

    return (
        <Helmet>
            <title>{title}</title>
            <meta name='description' content={description} />
            {url && <link rel='canonical' href={url} />}
        </Helmet>
    );
};
