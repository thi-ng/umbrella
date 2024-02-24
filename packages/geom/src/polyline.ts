import type { Attribs } from "@thi.ng/geom-api";
import { mix } from "@thi.ng/math/mix";
import { map } from "@thi.ng/transducers/map";
import { normRange } from "@thi.ng/transducers/norm-range";
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";
import { cartesian2 } from "@thi.ng/vectors/cartesian";
import { Polyline } from "./api/polyline.js";

export const polyline = (pts: Iterable<Vec>, attribs?: Attribs) =>
	new Polyline(pts, attribs);

/**
 * Creates a polyline spiral from given params. The number of twists is defined
 * by the angle range. Resolution depends on angle range and number of steps.
 *
 * @example
 * ```ts
 * import { spiral } from "@thi.ng/geom";
 *
 * // 4 full turns over 80 steps
 * spiral([0, 0], 5, 100, 0, Math.PI * 2 * 4, 80);
 * ```
 *
 * @param origin
 * @param r1
 * @param r2
 * @param startTheta
 * @param endTheta
 * @param steps
 * @param attribs
 */
export const spiral = (
	origin: ReadonlyVec,
	r1: number,
	r2: number,
	startTheta: number,
	endTheta: number,
	steps: number,
	attribs?: Attribs
) =>
	new Polyline(
		[
			...map(
				(t) =>
					cartesian2(
						null,
						[mix(r1, r2, t), mix(startTheta, endTheta, t)],
						origin
					),
				normRange(steps - 1)
			),
		],
		attribs
	);
