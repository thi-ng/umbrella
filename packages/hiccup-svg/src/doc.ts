import { SVG_NS } from "@thi.ng/hiccup/api";

export const svgdoc = (attr, ...body) => [
    "svg",
    Object.assign(attr, { xmlns: SVG_NS }),
    ...body
];
