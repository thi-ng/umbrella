import type { Attribs } from "@thi.ng/geom-api";
import { quadraticFromLine as _line } from "@thi.ng/geom-splines/quadratic-line";
import type { Vec } from "@thi.ng/vectors";
import { Quadratic } from "./api/quadratic.js";
import { __pclike } from "./internal/pclike.js";

export function quadratic(a: Vec, b: Vec, c: Vec, attribs?: Attribs): Quadratic;
export function quadratic(pts: Iterable<Vec>, attribs?: Attribs): Quadratic;
export function quadratic(...args: any[]) {
	return __pclike(Quadratic, args);
}

export const quadraticFromLine = (a: Vec, b: Vec, attribs?: Attribs) =>
	new Quadratic(_line(a, b), attribs);
