import {useEffect, RefObject} from "react";

interface useScrollIntoViewProps {
    ref: RefObject<HTMLElement | null>,
    dependencies: unknown[];
    behavior?: ScrollBehavior;
    block?: ScrollLogicalPosition;
}

export default function useScrollIntoView({
                                              ref,
                                              dependencies,
                                              block = "start",
                                              behavior = "smooth",

                                          }: useScrollIntoViewProps) {
    useEffect(() => {
        if (ref.current) {
            ref.current.scrollIntoView({
                block,
                behavior,
            });
        }
    }, [...dependencies, block, behavior]);
}