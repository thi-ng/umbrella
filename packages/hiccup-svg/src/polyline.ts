import { fattribs, fpoints } from "./format.js";
import type { Vec2Like } from "./api.js";

export const polyline = (
    pts: Vec2Like[],
    attribs?: any,
    ...body: any[]
): any[] => [
    "polyline",
    fattribs({
        fill: "none",
        points: fpoints(pts),
        ...attribs,
    }),
    ...body,
];
