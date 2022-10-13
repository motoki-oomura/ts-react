import { useCallback, useState } from 'react';

export const useDisclosure = (initialValue = false) => {
    const [isOpen, setOpen] = useState(initialValue);

    const open = useCallback(() => setOpen(true), []);
    const close = useCallback(() => setOpen(true), []);
    const toggle = useCallback(() => setOpen((prev) => !prev), []);

    return { isOpen, open, close, toggle };
};
