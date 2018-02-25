import { SVG_NS } from "@thi.ng/hiccup/api";

export interface PathSegment extends Array<any> {
    [0]: string;
    [1]?: ArrayLike<number>[];
}

let PRECISION = 2;

export const setPrecision = (n: number) => (PRECISION = n);

export const svgdoc = (attr, ...body) => [
    "svg",
    Object.assign(attr, { xmlns: SVG_NS }),
    ...body
];

export const ff = (x: number) => x.toFixed(PRECISION);
export const point = (p: ArrayLike<number>) => ff(p[0]) + "," + ff(p[1]);

export const defs = (...defs) => ["defs", ...defs];

export const group = (attr, ...body) => ["g", attr, ...body];

export const circle = (p: ArrayLike<number>, r = 1, attr?) =>
    [
        "circle",
        Object.assign({
            cx: ff(p[0]),
            cy: ff(p[1]),
            r: ff(r),
        }, attr)
    ];

export const rect = (p: ArrayLike<number>, width = 1, height = 1, attr?) =>
    [
        "rect",
        Object.assign({
            x: ff(p[0]),
            y: ff(p[1]),
            width: ff(width),
            height: ff(height),
        }, attr)
    ];

export const polyline = (points: ArrayLike<number>[], attr?) =>
    [
        "polyline",
        Object.assign({ points: points.map(point).join(" ") }, attr)
    ];

export const polygon = (points: ArrayLike<number>[], attr?) =>
    [
        "polygon",
        Object.assign({ points: points.map(point).join(" ") }, attr)
    ];

export const path = (segments: PathSegment[], attr?) =>
    [
        "path",
        {
            ...attr,
            d: segments.map((seg) => seg[0] + seg[1].map(point).join(",")),
        }
    ];

export const text = (body: string, p: ArrayLike<number>, attr?) =>
    ["text",
        {
            x: ff(p[0]),
            y: ff(p[1]),
            ...attr
        },
        body
    ];

const gradient = (type: string, attribs: any, stops: [any, string][]) =>
    [type,
        attribs,
        ...stops.map(
            ([offset, col]) => ["stop", { offset, "stop-color": col }]
        )
    ];

export const linearGradient = (id: string, x1, y1, x2, y2, stops: [any, string][]) =>
    gradient(
        "linearGradient",
        { id, x1, y1, x2, y2 },
        stops
    );

export const radialGradient = (id: string, cx, cy, r, stops: [any, string][]) =>
    gradient(
        "radialGradient",
        { id, cx, cy, r },
        stops
    );
