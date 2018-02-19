import { SVG_NS } from "@thi.ng/hiccup/api";

let PRECISION = 2;

export const setPrecision = (n: number) => (PRECISION = n);

export const svgdoc = (attribs, ...body) => [
    "svg",
    Object.assign(attribs, { xmlns: SVG_NS }),
    ...body
];

export const ff = (x: number) => x.toFixed(PRECISION);
export const point = (p: number[]) => ff(p[0]) + "," + ff(p[1]);

export const defs = (...defs) => ["defs", ...defs];

export const circle = (p: number[], r = 1, attr?) =>
    [
        "circle",
        Object.assign({
            cx: ff(p[0]),
            cy: ff(p[1]),
            r: ff(r),
        }, attr)
    ];

export const rect = (p: number[], width = 1, height = 1, attr?) =>
    [
        "rect",
        Object.assign({
            x: ff(p[0]),
            y: ff(p[1]),
            width: ff(width),
            height: ff(height),
        }, attr)
    ];

export const polyline = (points: number[][], attr?) =>
    [
        "polyline",
        Object.assign({ points: points.map(point).join(" ") }, attr)
    ];

export const polygon = (points: number[][], attr?) =>
    [
        "polygon",
        Object.assign({ points: points.map(point).join(" ") }, attr)
    ];

export const text = (body: string, p: number[], attr?) =>
    ["text",
        {
            x: ff(p[0]),
            y: ff(p[1]),
            ...attr
        },
        body
    ];
