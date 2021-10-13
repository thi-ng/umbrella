import { fattribs, fpoints } from "./format.js";
import type { Vec2Like } from "./api.js";

export const polygon = (
    pts: Vec2Like[],
    attribs?: any,
    ...body: any[]
): any[] => [
    "polygon",
    fattribs({
        ...attribs,
        points: fpoints(pts),
    }),
    ...body,
];
