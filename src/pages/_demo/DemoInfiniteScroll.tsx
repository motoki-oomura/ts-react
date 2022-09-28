import React, {useCallback, useEffect, useRef, useState} from 'react';
import _DemoPageLayout from "@pages/_demo/_DemoPageLayout";
import {wait} from "@utils/misc";
import InfiniteScroll from "@features/InfiniteScroll/components/InfiniteScroll";

async function generateListItem(items: {index: number}[], count: number) {
    await wait(1000);
    const newArray = [...items, ...[...Array(count)]];
    return newArray.map((_, i) => ({index: i + 1}));
}

const DemoInfiniteScroll: React.FC = () => {
    const [items, setItems] = useState<{index:number}[]>([]);
    const [hasMore, setHasMore] = useState(true);

    const loadMore = async () => {
        const newItems = await generateListItem(items, 20);
        setItems(newItems);
        if (newItems.length >= 100) setHasMore(false);
    }

    useEffect(() => {
        (async () => {
            const newItems = await generateListItem([], 20);
            setItems(newItems);
        })();
    }, [setItems]);

    return (
        <_DemoPageLayout>
            demo infinite scroll.
            <InfiniteScroll loader={<div key={'loader'}>loading...</div>} hasMore={hasMore} loadMore={loadMore}>
                {
                    items.map(({ index }) => (<Item key={index}>{ index }</Item>))
                }
            </InfiniteScroll>
        </_DemoPageLayout>
    );
};
export default DemoInfiniteScroll;

const Item: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        maxWidth: "600px",
        height: '300px',
        fontSize: "60px",
        backgroundColor: "#FFAAAA",
        color: "#FFFFFF",
        marginTop: "10px"
    }}>
        { children }
    </div>
);