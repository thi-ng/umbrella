import { ff } from "./format";

export const circle = (p: ArrayLike<number>, r = 1, attr?) =>
    [
        "circle",
        Object.assign({
            cx: ff(p[0]),
            cy: ff(p[1]),
            r: ff(r),
        }, attr)
    ];
