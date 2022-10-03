
export const getPageList = (viewCount: number, totalCount: number) => {
    return [...Array(calcPageCount(viewCount, totalCount))].map((_, i) => i + 1);
};

export const calcPageCount = (viewCount: number, totalCount: number) => {
    return viewCount !== 0 ? Math.ceil(totalCount/viewCount) : 0;
}