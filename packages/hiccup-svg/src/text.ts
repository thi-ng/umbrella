import { fattribs, ff } from "./format";
import type { Vec2Like } from "./api";

export const text = (
    p: Vec2Like,
    body: string,
    attribs?: any,
    ...xs: any[]
): any[] => [
    "text",
    fattribs({
        ...attribs,
        x: ff(p[0]),
        y: ff(p[1]),
    }),
    body,
    ...xs,
];
