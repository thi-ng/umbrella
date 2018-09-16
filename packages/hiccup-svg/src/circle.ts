import { Vec2Like } from "./api";
import { ff } from "./format";

export const circle = (p: Vec2Like, r: number, attribs?: any): any[] =>
    ["circle", {
        cx: ff(p[0]),
        cy: ff(p[1]),
        r: ff(r),
        ...attribs
    }];
