export const notEmpty = <T>(item: T | null | undefined): item is T => {
    return item !== null && item !== undefined;
}

export const chunkArray = <T>(arr: T[] = [], size: number): T[][] => {
    return Array.from({
        length: Math.ceil(arr.length / size)
    }, (_, i) => [...arr].slice(i * size, i * size + size))
};
