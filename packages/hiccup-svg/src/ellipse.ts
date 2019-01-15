import { Vec2Like } from "./api";
import { ff } from "./format";

export const ellipse =
    (p: Vec2Like, rx: number, ry: number, attribs?: any): any[] =>
        ["ellipse", {
            cx: ff(p[0]),
            cy: ff(p[1]),
            rx: ff(rx),
            ry: ff(ry),
            ...attribs
        }];
