import { Vec2Like } from "./api";
import { fpoints } from "./format";

export const polygon = (pts: Vec2Like[], attribs?: any): any[] =>
    ["polygon", { points: fpoints(pts), ...attribs }];
