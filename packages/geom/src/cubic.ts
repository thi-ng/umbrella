import type { Attribs } from "@thi.ng/geom-api";
import { cubicFromArc as _arc } from "@thi.ng/geom-splines/cubic-arc";
import { cubicFromLine as _line } from "@thi.ng/geom-splines/cubic-line";
import { cubicFromQuadratic as _quad } from "@thi.ng/geom-splines/cubic-quadratic";
import type { Vec } from "@thi.ng/vectors";
import type { Arc } from "./api/arc.js";
import { Cubic } from "./api/cubic.js";
import { __copyAttribs } from "./internal/copy.js";
import { __pclike } from "./internal/pclike.js";

export function cubic(a: Vec, b: Vec, c: Vec, d: Vec, attribs?: Attribs): Cubic;
export function cubic(pts: Vec[], attribs?: Attribs): Cubic;
export function cubic(...args: any[]) {
	return __pclike(Cubic, args);
}

export const cubicFromArc = (arc: Arc) =>
	_arc(arc.pos, arc.r, arc.axis, arc.start, arc.end).map(
		(c) => new Cubic(c, __copyAttribs(arc))
	);

export const cubicFromLine = (a: Vec, b: Vec, attribs?: Attribs) =>
	new Cubic(_line(a, b), attribs);

export const cubicFromQuadratic = (a: Vec, b: Vec, c: Vec, attribs?: Attribs) =>
	new Cubic(_quad(a, b, c), attribs);
