import { ff } from "./format";

export const line = (a: ArrayLike<number>, b: ArrayLike<number>, attr?) =>
    [
        "line",
        Object.assign({
            x1: ff(a[0]),
            y1: ff(a[1]),
            x2: ff(b[0]),
            y2: ff(b[1]),
        }, attr)
    ];
