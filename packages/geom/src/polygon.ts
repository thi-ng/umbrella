import type { Attribs } from "@thi.ng/geom-api";
import { TAU } from "@thi.ng/math/api";
import { cycle } from "@thi.ng/transducers/cycle";
import { map } from "@thi.ng/transducers/map";
import { normRange } from "@thi.ng/transducers/norm-range";
import { push } from "@thi.ng/transducers/push";
import { transduce } from "@thi.ng/transducers/transduce";
import { zip } from "@thi.ng/transducers/zip";
import type { Vec } from "@thi.ng/vectors";
import { cartesian2 } from "@thi.ng/vectors/cartesian";
import { Polygon } from "./api/polygon.js";

export const polygon = (pts?: Vec[], attribs?: Attribs) =>
	new Polygon(pts, attribs);

/**
 * Syntax sugar for {@link starWithCentroid}, using [0,0] as center.
 *
 * @param r
 * @param n
 * @param profile
 * @param attribs
 * @returns
 */
export const star = (
	r: number,
	n: number,
	profile: number[],
	attribs?: Attribs
) => starWithCentroid([0, 0], r, n, profile, attribs);

/**
 * Creates a new "star"-shaped polygon around `pos` with radius `r` and `n`
 * repetitions of `profile`. The latter is an array of radius scale values to
 * define the overall shape. The resulting polygon will have `n *
 * profile.length` vertices. To create an actual star-like shape, the profile
 * needs to contain at least 2 values, e.g. `[1, 0.5]`, meaning every other
 * vertex will be inset to 50% of the base radius.
 *
 * @example
 * ```ts
 * starWithCentroid([100,200], 50, 5, [1, 0.5])
 * // Polygon {
 * //   points: [
 * //     [150.000, 200.000],
 * //     [120.225, 214.695],
 * //     [115.451, 247.553],
 * //     [92.275, 223.776],
 * //     [59.549, 229.389],
 * //     [75.000, 200.000],
 * //     [59.549, 170.611],
 * //     [92.275, 176.224],
 * //     [115.451, 152.447],
 * //     [120.225, 185.305]
 * //   ],
 * //   attribs: undefined
 * // }
 * ```
 *
 * @param pos
 * @param r
 * @param n
 * @param profile
 * @param attribs
 * @returns
 */
export const starWithCentroid = (
	pos: Vec,
	r: number,
	n: number,
	profile: number[],
	attribs?: Attribs
) =>
	new Polygon(
		transduce(
			map(([i, p]) => cartesian2(null, [r * p, i * TAU], pos)),
			push(),
			zip(normRange(n * profile.length, false), cycle(profile))
		),
		attribs
	);
