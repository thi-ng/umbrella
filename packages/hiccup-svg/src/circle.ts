import { fattribs, ff } from "./format";
import type { Vec2Like } from "./api";

export const circle = (p: Vec2Like, r: number, attribs?: any): any[] => [
    "circle",
    fattribs({
        ...attribs,
        cx: ff(p[0]),
        cy: ff(p[1]),
        r: ff(r),
    }),
];
