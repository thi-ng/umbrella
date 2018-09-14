import { Vec2Like } from "./api";
import { ff } from "./format";

export const image = (pos: Vec2Like, url: string, attribs?: any): any[] =>
    ["image", {
        "xlink:href": url,
        x: ff(pos[0]), y: ff(pos[1]),
        ...attribs
    }];
