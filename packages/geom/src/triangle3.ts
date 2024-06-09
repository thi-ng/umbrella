import type { Attribs } from "./api.js";
import type { Vec } from "@thi.ng/vectors";
import { Triangle3 } from "./api/triangle3.js";
import { __pclike } from "./internal/pclike.js";

export function triangle3(a: Vec, b: Vec, c: Vec, attribs?: Attribs): Triangle3;
export function triangle3(pts: Iterable<Vec>, attribs?: Attribs): Triangle3;
export function triangle3(...args: any[]) {
	return __pclike(Triangle3, args);
}
