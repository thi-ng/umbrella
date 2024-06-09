import type { Attribs } from "./api.js";
import type { Vec } from "@thi.ng/vectors";
import { Quad } from "./api/quad.js";
import { __pclike } from "./internal/pclike.js";

export function quad(a: Vec, b: Vec, c: Vec, d: Vec, attribs?: Attribs): Quad;
export function quad(pts: Iterable<Vec>, attribs?: Attribs): Quad;
export function quad(...args: any[]) {
	return __pclike(Quad, args);
}
