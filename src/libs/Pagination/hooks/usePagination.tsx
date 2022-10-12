import React from 'react';
import { useCallback, useMemo, useState } from 'react';
import { getPageList } from '../index';

type RenderPaginateProps = {
    normal: (page: number) => React.ReactNode;
    active: (page: number) => React.ReactNode;
    prev: (page: number) => React.ReactNode;
    next: (page: number) => React.ReactNode;
};

/**
 * ページネーションを表現するHook
 */
type UsePaginationOptions = {
    viewCount?: number;
    initialPage?: number;
};
const usePagination = (options: UsePaginationOptions) => {
    const { viewCount: initialViewCount = 20, initialPage = 1 } = options;
    const [page, onPaginate] = useState(initialPage < 0 ? 0 : initialPage);
    const [viewCount, setViewCount] = useState(initialViewCount);
    const [totalCount, setTotalCount] = useState(0);
    const pageList = useMemo(
        () => getPageList(viewCount, totalCount),
        [totalCount, viewCount]
    );
    const startCount = useMemo(
        () => (page - 1) * viewCount + 1,
        [page, viewCount]
    );
    const endCount = useMemo(() => page * viewCount, [page, viewCount]);

    const isViewIndex = useCallback(
        (index: number) => {
            return startCount <= index + 1 && index + 1 <= endCount;
        },
        [startCount, endCount]
    );

    const onNextPaginate = useCallback(
        async (fetchCallback?: (newPage: number) => Promise<unknown>) => {
            const newPage =
                pageList.length <= page ? pageList.length : page + 1;
            if (newPage === page) return;
            const res = fetchCallback ? await fetchCallback(newPage) : null;
            onPaginate(newPage);
            return [res, newPage];
        },
        [pageList, page]
    );

    const onPrevPaginate = useCallback(
        async (fetchCallback?: (newPage: number) => Promise<unknown>) => {
            const newPage = 1 >= page ? 1 : page - 1;
            if (newPage === page) return;
            const res = fetchCallback ? await fetchCallback(newPage) : null;
            onPaginate(newPage);
            return [res, newPage];
        },
        [pageList, page]
    );

    const renderPaginate = ({
        next,
        prev,
        normal,
        active,
    }: RenderPaginateProps): React.ReactNode => {
        if (pageList.length === 0) return null;
        return (
            <>
                <React.Fragment key={`pagination_prev`}>
                    {prev(page)}
                </React.Fragment>
                {pageList.map((p) => (
                    <React.Fragment key={`pagination_${p}`}>
                        {p === page ? active(p) : normal(p)}
                    </React.Fragment>
                ))}
                <React.Fragment key={`pagination_next`}>
                    {next(page)}
                </React.Fragment>
            </>
        );
    };

    return {
        page,
        onNextPaginate,
        onPrevPaginate,
        onPaginate,
        setTotalCount,
        setViewCount,
        renderPaginate,
        isViewIndex,
    };
};
export default usePagination;
