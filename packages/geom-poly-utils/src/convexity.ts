import { Convexity } from "@thi.ng/geom-api/convex";
import { EPS } from "@thi.ng/math/api";
import type { ReadonlyVec } from "@thi.ng/vectors";
import { corner2 } from "@thi.ng/vectors/clockwise";

export const convexity = (pts: ReadonlyVec[], eps = EPS) => {
	let n = pts.length;
	if (n < 3) {
		return n < 2 ? Convexity.ILLEGAL : Convexity.COLINEAR;
	}
	let type = 0;
	let a = pts[n - 2];
	let b = pts[n - 1];
	let c = pts[0];
	for (let i = 0; i < n && type < 3; a = b, b = c, c = pts[++i]) {
		const t = corner2(a, b, c, eps);
		type |= t < 0 ? 1 : t > 0 ? 2 : 0;
	}
	return type === 3
		? Convexity.CONCAVE
		: type > 0
		? Convexity.CONVEX
		: Convexity.COLINEAR;
};
