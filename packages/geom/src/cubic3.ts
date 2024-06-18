import { cubicFromLine as $line } from "@thi.ng/geom-splines/cubic-line";
import { cubicFromQuadratic as $quad } from "@thi.ng/geom-splines/cubic-quadratic";
import type { Vec } from "@thi.ng/vectors";
import type { Attribs } from "./api.js";
import { Cubic3 } from "./api/cubic3.js";
import { __pclike } from "./internal/pclike.js";

export function cubic3(
	a: Vec,
	b: Vec,
	c: Vec,
	d: Vec,
	attribs?: Attribs
): Cubic3;
export function cubic3(pts: Iterable<Vec>, attribs?: Attribs): Cubic3;
export function cubic3(...args: any[]) {
	return __pclike(Cubic3, args);
}

export const cubicFromLine3 = (a: Vec, b: Vec, attribs?: Attribs) =>
	new Cubic3($line(a, b), attribs);

export const cubicFromQuadratic3 = (
	a: Vec,
	b: Vec,
	c: Vec,
	attribs?: Attribs
) => new Cubic3($quad(a, b, c), attribs);
