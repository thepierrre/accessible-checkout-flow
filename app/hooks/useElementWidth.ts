import {RefObject, useLayoutEffect, useState} from "react";

export default function useElementWidth(refObject: RefObject<HTMLElement | null>) {
    const [elementWidth, setElementWidth] = useState(0);

    useLayoutEffect(() => {
        if (!refObject.current) return;

        function updateWidth() {
            if (refObject.current) {
                setElementWidth(refObject.current.clientWidth);
            }
        }

        updateWidth();

        const observer = new ResizeObserver(updateWidth);
        observer.observe(refObject.current);

        return () => {
            observer.disconnect();
        };
    }, [refObject]);

    return elementWidth;
}