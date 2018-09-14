import { SVG_NS, XLINK_NS } from "@thi.ng/hiccup/api";

export const svg = (attribs: any, ...body: any[]): any[] =>
    ["svg", {
        version: "1.1",
        xmlns: SVG_NS,
        "xmlns:xlink": XLINK_NS,
        ...attribs
    }, ...body];
