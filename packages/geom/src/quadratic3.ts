import type { Attribs } from "@thi.ng/geom-api";
import { quadraticFromLine as _line } from "@thi.ng/geom-splines/quadratic-line";
import type { Vec } from "@thi.ng/vectors";
import { Quadratic3 } from "./api/quadratic3.js";
import { __pclike } from "./internal/pclike.js";

export function quadratic3(
	a: Vec,
	b: Vec,
	c: Vec,
	attribs?: Attribs
): Quadratic3;
export function quadratic3(pts: Iterable<Vec>, attribs?: Attribs): Quadratic3;
export function quadratic3(...args: any[]) {
	return __pclike(Quadratic3, args);
}

export const quadraticFromLine3 = (a: Vec, b: Vec, attribs?: Attribs) =>
	new Quadratic3(_line(a, b), attribs);
