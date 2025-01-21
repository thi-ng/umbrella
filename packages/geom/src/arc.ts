// SPDX-License-Identifier: Apache-2.0
import { isNumber } from "@thi.ng/checks/is-number";
import type { Attribs } from "./api.js";
import { fromEndPoints } from "@thi.ng/geom-arc/from-endpoints";
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";
import { Arc } from "./api/arc.js";
import { absDiff } from "@thi.ng/math/abs";
import { PI } from "@thi.ng/math/api";

/**
 * Creates a new elliptic {@link Arc} from given `center`, `radii`, `axis`
 * rotation, `start` and `end` angles (in radians).
 *
 * @remarks
 * The `xl` (large arc) and `clockwise` params are defaulting to:
 *
 * - xl = true if |start-end| > PI
 * - clockwise = true if end > start
 *
 * Reference:
 * - https://svgwg.org/svg2-draft/paths.html#PathDataEllipticalArcCommands
 * - https://svgwg.org/svg2-draft/images/paths/arcs02.svg
 *
 * Also see {@link arcFrom2Points}, {@link pathFromSvg} for an alternative construction.
 *
 * @param center
 * @param radii
 * @param axis
 * @param start
 * @param end
 * @param xl
 * @param clockwise
 * @param attribs
 */
export const arc = (
	center: Vec,
	radii: number | Vec,
	axis: number,
	start: number,
	end: number,
	xl = absDiff(start, end) > PI,
	clockwise = end > start,
	attribs?: Attribs
) =>
	new Arc(
		center,
		isNumber(radii) ? [radii, radii] : radii,
		axis,
		start,
		end,
		xl,
		clockwise,
		attribs
	);

/**
 * Constructs a new {@link Arc} between the two given points `a` and `b` using
 * `radii`, `axis` rotation (in radians) and `xl`, `clockwise` params to
 * configure which of 4 possible arcs will be chosen.
 *
 * @remarks
 * This function returns `undefined` if it's mathematically impossible to create
 * an arc with the given parameters.
 *
 * Reference:
 * - https://svgwg.org/svg2-draft/paths.html#PathDataEllipticalArcCommands
 * - https://svgwg.org/svg2-draft/images/paths/arcs02.svg
 * - https://svgwg.org/svg2-draft/implnote.html#ArcConversionEndpointToCenter
 * - https://www.w3.org/TR/SVG11/implnote.html#ArcImplementationNotes
 *
 * Also see {@link arc}, {@link pathFromSvg} for an alternative construction.
 *
 * @param a
 * @param b
 * @param radii
 * @param axis
 * @param xl
 * @param cw
 * @param attribs
 */
export const arcFrom2Points = (
	a: ReadonlyVec,
	b: ReadonlyVec,
	radii: ReadonlyVec,
	axis = 0,
	xl = false,
	cw = false,
	attribs?: Attribs
) => {
	const res = fromEndPoints(a, b, radii, axis, xl, cw);
	return res
		? new Arc(
				res.center,
				res.r,
				res.axis,
				res.start,
				res.end,
				res.xl,
				res.cw,
				attribs
		  )
		: undefined;
};
