import {RefObject, useEffect} from "react";

export default function useScrollOnError(errorRef: RefObject<HTMLElement | null>) {
    useEffect(() => {
        if (errorRef.current) {
            errorRef.current.scrollIntoView({
                block: "start",
                behavior: "smooth",
            });
        }
    });
}