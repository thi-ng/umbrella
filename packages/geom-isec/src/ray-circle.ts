// SPDX-License-Identifier: Apache-2.0
import type { Maybe } from "@thi.ng/api";
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";
import { dot } from "@thi.ng/vectors/dot";
import { maddN } from "@thi.ng/vectors/maddn";
import { magSq } from "@thi.ng/vectors/magsq";
import { sub } from "@thi.ng/vectors/sub";
import { IntersectionType, NONE, type IntersectionResult } from "./api.js";

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
	const isec: Maybe<[boolean, number, Maybe<number>, Vec[]]> =
		a >= 0
			? b >= 0
				? a > b
					? // prettier-ignore
					  [false,b, a, [maddN(delta, dir, b, rpos), maddN([], dir, a, rpos)]]
					: // prettier-ignore
					  [false, a, b, [maddN(delta, dir, a, rpos), maddN([], dir, b, rpos)]]
				: [true, a, undefined, [maddN(delta, dir, a, rpos)]]
			: b >= 0
			? [true, b, undefined, [maddN(delta, dir, b, rpos)]]
			: undefined;
	return isec
		? {
				type: IntersectionType.INTERSECT,
				inside: isec[0],
				alpha: isec[1],
				beta: isec[2],
				isec: isec[3],
		  }
		: NONE;
};
