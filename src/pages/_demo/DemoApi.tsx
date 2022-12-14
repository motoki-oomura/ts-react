import React from 'react';
import _DemoPageLayout from '@pages/_demo/_DemoPageLayout';
import useGetApiCall from '@libs/Api/hooks/useGetApiCall';

const Async: React.FC<{
    loading: boolean;
    children: React.ReactNode;
    fallback?: React.ReactNode;
}> = (props) => {
    return <>{props.loading ? props.fallback ?? null : props.children}</>;
};

// https://sampleapis.com/api-list/
const DemoApi = () => {
    const { loading, data } = useGetApiCall<unknown[]>('https://api.sampleapis.com/baseball/hitsSingleSeason');
    // const { api, loading, data, cancel } = useApi<unknown[]>();

    return (
        <_DemoPageLayout>
            <Async loading={loading} fallback={<div>loading...</div>}>
                {data?.map((d, i) => (
                    <div key={i}>{JSON.stringify(d)}</div>
                ))}
            </Async>
        </_DemoPageLayout>
    );
};
export default DemoApi;
