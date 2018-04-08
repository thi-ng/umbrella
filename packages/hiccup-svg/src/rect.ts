import { ff } from "./format";

export const rect = (p: ArrayLike<number>, width = 1, height = 1, attr?) =>
    [
        "rect",
        Object.assign({
            x: ff(p[0]),
            y: ff(p[1]),
            width: ff(width),
            height: ff(height),
        }, attr)
    ];
