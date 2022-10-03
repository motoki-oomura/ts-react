import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

/**
 * Portalを簡単に実装するためのフック
 */
type Options = Partial<{
    initView: boolean; // Mount時に表示するか
}>;
const usePortal = (id = 'unknown', options: Options = {}) => {
    const { initView } = options;
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement | null>(null);

    const showPortal = useCallback(() => setIsOpen(true), []);
    const hiddenPortal = useCallback(() => setIsOpen(false), []);

    const renderPortal = useCallback(
        (children: React.ReactNode) => {
            if (!isOpen) return null;
            return ref.current && ReactDOM.createPortal(children, ref.current);
        },
        [isOpen]
    );

    useEffect(() => {
        if (ref.current !== null) return;
        const el = document.createElement('div');
        el.setAttribute('id', `portal_${id}`);
        document.body.appendChild(el);
        ref.current = el;

        if (initView) setIsOpen(true);

        return () => {
            ref.current = null;
            document.body.removeChild(el);
        };
    }, [id, initView]);

    return { renderPortal, showPortal, hiddenPortal };
};
export default usePortal;
