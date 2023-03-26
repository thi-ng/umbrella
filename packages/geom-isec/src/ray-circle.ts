import {
	IntersectionType,
	type IntersectionResult,
} from "@thi.ng/geom-api/isec";
import type { ReadonlyVec } from "@thi.ng/vectors";
import { dot } from "@thi.ng/vectors/dot";
import { maddN } from "@thi.ng/vectors/maddn";
import { magSq } from "@thi.ng/vectors/magsq";
import { sub } from "@thi.ng/vectors/sub";
import { NONE } from "./api.js";

export const intersectRayCircle = (
	rpos: ReadonlyVec,
	dir: ReadonlyVec,
	spos: ReadonlyVec,
	r: number
): IntersectionResult => {
	const delta = sub([], spos, rpos);
	const w = dot(delta, dir);
	let d = r * r + w * w - magSq(delta);
	if (d < 0) return NONE;
	d = Math.sqrt(d);
	const a = w + d;
	const b = w - d;
	const isec =
		a >= 0
			? b >= 0
				? a > b
					? [maddN(delta, dir, b, rpos), maddN([], dir, a, rpos)]
					: [maddN(delta, dir, a, rpos), maddN([], dir, b, rpos)]
				: [maddN(delta, dir, a, rpos)]
			: b >= 0
			? [maddN(delta, dir, b, rpos)]
			: undefined;
	return isec ? { type: IntersectionType.INTERSECT, isec } : NONE;
};
