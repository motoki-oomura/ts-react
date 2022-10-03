import { useEffect, useRef } from 'react';

const usePrevState = <T>(value: T) => {
    const ref = useRef<T | undefined>();

    useEffect(() => {
        ref.current = value;
    }, [value]);

    return ref.current;
};
export default usePrevState;
