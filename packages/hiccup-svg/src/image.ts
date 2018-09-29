import { Vec2Like } from "./api";
import { ff } from "./format";

export const image = (pos: Vec2Like, url: string, attribs?: any): any[] =>
    ["image", {
        // TODO replace w/ SVG2 `href` once Safari supports it
        "xlink:href": url,
        x: ff(pos[0]), y: ff(pos[1]),
        ...attribs
    }];
