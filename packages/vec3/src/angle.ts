// SPDX-License-Identifier: Apache-2.0
import type { FnU2 } from "@thi.ng/api";
import { absInnerAngle, deg, rad } from "@thi.ng/math/angle";
import type { VecOpV } from "@thi.ng/vec-api";
import type { ReadonlyVec } from "./api.js";
import { dot3 } from "./dot.js";
import { mag3 } from "./mag.js";

/**
 * Componentwise computes converts radians to degrees of given 3D vector. Also
 * see {@link radians3}.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const degrees3: VecOpV = (o, a) => {
	!o && (o = a);
	o[0] = deg(a[0]);
	o[1] = deg(a[1]);
	o[2] = deg(a[2]);
	return o;
};

/**
 * Componentwise computes converts degrees to radians of given 3D vector. Also
 * see {@link degrees3}.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const radians3: VecOpV = (o, a) => {
	!o && (o = a);
	o[0] = rad(a[0]);
	o[1] = rad(a[1]);
	o[2] = rad(a[2]);
	return o;
};

export const angleRatio3: FnU2<ReadonlyVec, number> = (a, b) =>
	dot3(a, b) / (mag3(a) * mag3(b));

export const angleBetween3 = (
	a: ReadonlyVec,
	b: ReadonlyVec,
	normalize = true,
	absInner = false
) => {
	const t = normalize ? Math.acos(angleRatio3(a, b)) : Math.acos(dot3(a, b));
	return absInner ? absInnerAngle(t) : t;
};
