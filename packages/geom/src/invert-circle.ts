// SPDX-License-Identifier: Apache-2.0
import type { ReadonlyVec } from "@thi.ng/vectors";
import { maddN2 } from "@thi.ng/vectors/maddn";
import { magSq2 } from "@thi.ng/vectors/magsq";
import { sub2 } from "@thi.ng/vectors/sub";
import type { Circle } from "./api/circle.js";

/**
 * Inverts circle `c` in regards to reference circle `ref`. Mutates `c` in place
 * and returns it.
 *
 * @remarks
 * Reference:
 * https://en.wikipedia.org/wiki/Inversive_geometry#Inversion_in_a_circle
 *
 * @param c
 * @param ref
 */
export const invertCircle = (c: Circle, ref: Circle) => {
	const delta = sub2([], c.pos, ref.pos);
	const len2 = magSq2(delta);
	const l = Math.sqrt(len2) + 1e-6;
	const ra2 = c.r * c.r;
	const rb2 = ref.r * ref.r;
	const s = (l * rb2) / (len2 - ra2);
	c.pos = maddN2(null, delta, s / l, ref.pos);
	c.r = Math.abs((rb2 * c.r) / (len2 - ra2));
	return c;
};

/**
 * Applies inversion of point `p` in regards to reference circle `ref`.
 *
 * @remarks
 * From Wikipedia: "...for a point inside the circle, the nearer the point to
 * the center, the further away its transformation. While for any point (inside
 * or outside the circle), the nearer the point to the circle, the closer its
 * transformation."
 *
 * https://en.wikipedia.org/wiki/Inversive_geometry#Inversion_in_a_circle
 *
 * @param p
 * @param ref
 */
export const invertCirclePoint = (p: ReadonlyVec, ref: Circle) => {
	const d = sub2([], p, ref.pos);
	return maddN2([], d, (ref.r * ref.r) / magSq2(d), ref.pos);
};
