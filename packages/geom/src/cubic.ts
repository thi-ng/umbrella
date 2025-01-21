// SPDX-License-Identifier: Apache-2.0
import { cubicFromArc as $arc } from "@thi.ng/geom-splines/cubic-arc";
import { cubicFromLine as $line } from "@thi.ng/geom-splines/cubic-line";
import { cubicFromQuadratic as $quad } from "@thi.ng/geom-splines/cubic-quadratic";
import type { Vec } from "@thi.ng/vectors";
import type { Attribs } from "./api.js";
import type { Arc } from "./api/arc.js";
import { Cubic } from "./api/cubic.js";
import { __copyAttribs } from "./internal/copy.js";
import { __pclike } from "./internal/pclike.js";

export function cubic(a: Vec, b: Vec, c: Vec, d: Vec, attribs?: Attribs): Cubic;
export function cubic(pts: Iterable<Vec>, attribs?: Attribs): Cubic;
export function cubic(...args: any[]) {
	return __pclike(Cubic, args);
}

export const cubicFromArc = (arc: Arc) =>
	$arc(arc.pos, arc.r, arc.axis, arc.start, arc.end).map(
		(c) => new Cubic(c, __copyAttribs(arc.attribs))
	);

export const cubicFromLine = (a: Vec, b: Vec, attribs?: Attribs) =>
	new Cubic($line(a, b), attribs);

export const cubicFromQuadratic = (a: Vec, b: Vec, c: Vec, attribs?: Attribs) =>
	new Cubic($quad(a, b, c), attribs);
