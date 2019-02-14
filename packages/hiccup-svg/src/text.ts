import { Vec2Like } from "./api";
import { fattribs, ff } from "./format";

export const text =
    (p: Vec2Like, body: string, attribs?: any): any[] =>
        ["text",
            fattribs({
                ...attribs,
                x: ff(p[0]),
                y: ff(p[1]),
            }),
            body
        ];
