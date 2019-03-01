import { Vec2Like } from "./api";
import { fattribs, fpoints } from "./format";

export const polygon = (pts: Vec2Like[], attribs?: any): any[] => [
    "polygon",
    fattribs({
        ...attribs,
        points: fpoints(pts)
    })
];
