import { isNumber } from "@thi.ng/checks/is-number";
import type { Attribs } from "@thi.ng/geom-api";
import { closestPointPlane } from "@thi.ng/geom-closest-point/plane";
import { alignmentQuat } from "@thi.ng/matrices/alignment-quat";
import { mulVQ } from "@thi.ng/matrices/mulv";
import { add3 } from "@thi.ng/vectors/add";
import { ReadonlyVec, Vec, Z3 } from "@thi.ng/vectors/api";
import type { Plane } from "./api/plane.js";
import { Quad } from "./api/quad.js";
import { Quad3 } from "./api/quad3.js";
import { __argAttribs } from "./internal/args.js";
import { __pclike } from "./internal/pclike.js";

export function quad(a: Vec, b: Vec, c: Vec, d: Vec, attribs?: Attribs): Quad;
export function quad(pts: Vec[], attribs?: Attribs): Quad;
export function quad(...args: any[]) {
	return __pclike(Quad, args);
}

export function quad3(a: Vec, b: Vec, c: Vec, d: Vec, attribs?: Attribs): Quad;
export function quad3(pts: Vec[], attribs?: Attribs): Quad;
export function quad3(...args: any[]) {
	const attr = __argAttribs(args);
	return new Quad3(args.length === 1 ? args[0] : args, attr);
}

export const quadOnPlane = (
	plane: Plane,
	pos: ReadonlyVec,
	size: number | ReadonlyVec,
	attribs?: Attribs
) => {
	pos = closestPointPlane(pos, plane.normal, plane.w);
	const [w, h] = isNumber(size) ? [size, size] : size;
	const q = alignmentQuat(Z3, plane.normal);
	return new Quad3(
		[
			[-w, -h, 0],
			[w, -h, 0],
			[w, h, 0],
			[-w, h, 0],
		].map((p) => add3(null, mulVQ(null, q, p), pos)),
		attribs
	);
};
