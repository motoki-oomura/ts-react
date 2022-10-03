import React, {
    RefObject,
    useCallback,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from 'react';

/**
 * InfiniteScroll Component
 */
export type Props = {
    children: React.ReactNode;
    ref?: RefObject<HTMLElement>;
    element?: keyof HTMLElementTagNameMap;
    loadMore: (page: number) => Promise<void>;
    hasMore?: boolean;
    loader?: React.ReactNode;
    pageStart?: number;
    threshold?: number;
};
const InfiniteScroll: React.FC<Props> = (props) => {
    const {
        children,
        element,
        hasMore = false,
        loader = null,
        pageStart,
        ref,
        loadMore,
        threshold = 250,
    } = props;
    const [pageLoaded, setPageLoaded] = useState(pageStart ?? 0);
    const [isLoad, setIsLoad] = useState(false);
    const scrollElRef = useRef<HTMLElement | null>(null);
    const childrenArray = useMemo(
        () => [children, hasMore ? loader : null],
        [children, hasMore, loader]
    );

    const scrollElRefCallback = useCallback((node: HTMLElement | null) => {
        scrollElRef.current = ref?.current ?? node;
    }, []);

    const attachScrollListener = () => {
        document.addEventListener('scroll', handleScroll);
        document.addEventListener('resize', handleScroll);
    };

    const detachScrollListener = () => {
        document.removeEventListener('scroll', handleScroll);
        document.removeEventListener('resize', handleScroll);
    };

    const handleScroll = useCallback(async () => {
        if (scrollElRef.current === null) return;
        const scrollEl = window;
        const el = scrollElRef.current;
        const doc =
            document.documentElement ||
            document.body.parentNode ||
            document.body;
        const scrollTop = scrollEl.scrollY ?? doc.scrollTop;
        const offset = el?.offsetTop + el?.offsetHeight - scrollEl.innerHeight;
        if (scrollTop >= offset - threshold) {
            detachScrollListener();
            setIsLoad(true);
            await loadMore(pageLoaded + 1);
            setPageLoaded(pageLoaded + 1);
            setIsLoad(false);
        }
    }, [pageLoaded, loadMore, attachScrollListener, detachScrollListener]);

    useLayoutEffect(() => {
        if (isLoad) return;
        if (!hasMore) return;
        attachScrollListener();

        return () => {
            detachScrollListener();
        };
    }, [hasMore, isLoad, attachScrollListener, detachScrollListener]);

    // render
    const renderProps = { ref: scrollElRefCallback };
    return React.createElement(element ?? 'div', renderProps, childrenArray);
};
export default InfiniteScroll;
