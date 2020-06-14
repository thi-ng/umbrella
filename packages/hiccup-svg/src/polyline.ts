import { fattribs, fpoints } from "./format";
import type { Vec2Like } from "./api";

export const polyline = (pts: Vec2Like[], attribs?: any): any[] => [
    "polyline",
    fattribs({
        fill: "none",
        points: fpoints(pts),
        ...attribs,
    }),
];
