import { fattribs, fpoints } from "./format";
import type { Vec2Like } from "./api";

export const polygon = (pts: Vec2Like[], attribs?: any): any[] => [
    "polygon",
    fattribs({
        ...attribs,
        points: fpoints(pts),
    }),
];
