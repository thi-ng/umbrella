import { Vec2Like } from "./api";
import { ff } from "./format";

export const text = (p: Vec2Like, body: string, attribs?: any): any[] =>
    ["text", {
        x: ff(p[0]),
        y: ff(p[1]),
        ...attribs
    }, body];
