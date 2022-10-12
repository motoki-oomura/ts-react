import React from 'react';
import _DemoPageLayout from '@pages/_demo/_DemoPageLayout';
import usePagination from '@features/../../libs/Pagination/hooks/usePagination';
import useEffectOnce from '@hooks/useEffectOnce';
import useApi from '@features/../../libs/Api/hooks/useApi';

const VIEW_COUNT = 20;

const DemoPagination = () => {
    const {
        setTotalCount,
        renderPaginate,
        isViewIndex,
        onNextPaginate,
        onPrevPaginate,
        onPaginate,
    } = usePagination({ viewCount: VIEW_COUNT });
    const { api, data } = useApi<unknown[]>();

    useEffectOnce(() => {
        (async () => {
            try {
                const { data } = await api.get(
                    'https://api.sampleapis.com/baseball/hitsSingleSeason'
                );
                setTotalCount(data?.length ?? 0);
            } catch (e) {
                console.error('fetchError', e);
            }
        })();
    });

    return (
        <_DemoPageLayout>
            {data
                ?.filter((_, i) => isViewIndex(i))
                .map((d) => (
                    <div key={JSON.stringify(d)}>{JSON.stringify(d)}</div>
                ))}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    maxWidth: '100%',
                }}>
                {renderPaginate({
                    normal: (page) => (
                        <PaginateItem
                            isActive={false}
                            onClick={() => onPaginate(page)}>
                            {page}
                        </PaginateItem>
                    ),
                    active: (page) => (
                        <PaginateItem isActive={true}>{page}</PaginateItem>
                    ),
                    next: () => (
                        <PaginateItem
                            isActive={false}
                            onClick={() => onNextPaginate()}>
                            &gt;
                        </PaginateItem>
                    ),
                    prev: () => (
                        <PaginateItem
                            isActive={false}
                            onClick={() => onPrevPaginate()}>
                            &lt;
                        </PaginateItem>
                    ),
                })}
            </div>
        </_DemoPageLayout>
    );
};
export default DemoPagination;

const PaginateItem = ({
    children,
    isActive,
    onClick,
}: {
    children: React.ReactNode;
    isActive: boolean;
    onClick?: () => void;
}) => (
    <div
        style={{
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: isActive ? '#FFFFFF' : '#FFAAAA',
            color: isActive ? '#FFAAAA' : '#FFFFFF',
            cursor: onClick ? 'pointer' : 'default',
        }}
        onClick={onClick}>
        {children}
    </div>
);
