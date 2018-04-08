import { ff } from "./format";

export const text = (body: string, p: ArrayLike<number>, attr?) =>
    ["text",
        {
            x: ff(p[0]),
            y: ff(p[1]),
            ...attr
        },
        body
    ];
