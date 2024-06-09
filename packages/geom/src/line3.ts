import type { Attribs } from "./api.js";
import type { Vec } from "@thi.ng/vectors";
import { Line } from "./api/line.js";
import { Line3 } from "./api/line3.js";
import { __pclike } from "./internal/pclike.js";

export function line3(a: Vec, b: Vec, attribs?: Attribs): Line;
export function line3(pts: Iterable<Vec>, attribs?: Attribs): Line;
export function line3(...args: any[]) {
	return __pclike(Line3, args);
}
