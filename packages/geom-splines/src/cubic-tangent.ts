import type { ReadonlyVec, Vec } from "@thi.ng/vectors";
import { addW4 } from "@thi.ng/vectors/addw";
import { normalize } from "@thi.ng/vectors/normalize";

export const cubicTangentAt = (
	out: Vec,
	a: ReadonlyVec,
	b: ReadonlyVec,
	c: ReadonlyVec,
	d: ReadonlyVec,
	t: number,
	len = 1
) => {
	const s = 1 - t;
	const ss = s * s;
	const tt = t * t;
	const ts2 = 2 * t * s;
	return normalize(
		out,
		addW4(out, a, b, c, d, -3 * ss, 3 * (ss - ts2), 3 * (ts2 - tt), 3 * tt),
		len
	);
};
