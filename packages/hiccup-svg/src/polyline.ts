import { Vec2Like } from "./api";
import { fpoints } from "./format";

export const polyline = (pts: Vec2Like[], attribs?: any): any[] =>
    ["polyline", { points: fpoints(pts), ...attribs }];
