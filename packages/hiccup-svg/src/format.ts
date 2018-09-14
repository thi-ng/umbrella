import { Vec2Like } from "./api";

let PRECISION = 2;

export const setPrecision = (n: number) => (PRECISION = n);

export const ff = (x: number) => x.toFixed(PRECISION);

export const fpoint = (p: Vec2Like) => ff(p[0]) + "," + ff(p[1]);

export const fpoints = (pts: Vec2Like[], sep = " ") => pts ? pts.map(fpoint).join(sep) : "";
