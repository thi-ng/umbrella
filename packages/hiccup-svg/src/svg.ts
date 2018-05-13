import { SVG_NS } from "@thi.ng/hiccup/api";

export const svg = (attr, ...body) => [
    "svg",
    Object.assign(attr, { xmlns: SVG_NS }),
    ...body
];
