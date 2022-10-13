import { useEffect, useState } from 'react';

const useScroll = (element: unknown, options: IntersectionObserverInit = {}) => {
    const [isIntersecting, set] = useState(false);

    useEffect(() => {
        if (!(element instanceof Element)) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => set(entry.isIntersecting));
        }, options);

        observer.observe(element);
        return (): void => element && observer.unobserve(element);
    }, [element]);

    return isIntersecting;
};

export default useScroll;
