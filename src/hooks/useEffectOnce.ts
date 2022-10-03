import { EffectCallback, useEffect, useRef } from 'react';

const useEffectOnce = (effectCallback: EffectCallback) => {
    const onceRef = useRef(false);

    useEffect(() => {
        if (onceRef.current) return;
        const cleanup = effectCallback();
        return () => {
            onceRef.current = true;
            cleanup && cleanup();
        };
    }, []);
};
export default useEffectOnce;
