// SPDX-License-Identifier: Apache-2.0
import { absInnerAngle } from "@thi.ng/math/angle";
import type { ReadonlyVec } from "./api.js";
import { cross2 } from "./cross.js";
import { dot2, dot3 } from "./dot.js";
import { mag3 } from "./mag.js";

export const angleBetween2 = (
	a: ReadonlyVec,
	b: ReadonlyVec,
	absInner = false
) => {
	const t = Math.atan2(cross2(a, b), dot2(a, b));
	return absInner ? absInnerAngle(t) : t;
};

export const angleBetween3 = (
	a: ReadonlyVec,
	b: ReadonlyVec,
	normalize = true,
	absInner = false
) => {
	const dp = dot3(a, b);
	const t = Math.acos(normalize ? dp / (mag3(a) * mag3(b)) : dp);
	return absInner ? absInnerAngle(t) : t;
};
