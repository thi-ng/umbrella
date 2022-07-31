import type { ReadonlyVec, Vec } from "@thi.ng/vectors";
import { dot4 } from "@thi.ng/vectors/dot";
import { maddN4 } from "@thi.ng/vectors/maddn";
import { mulN4 } from "@thi.ng/vectors/muln";
import { set4 } from "@thi.ng/vectors/set";

/**
 * Interpolates quaternion `a` to `b` by given amount `t` [0...1], using
 * SLERP. Writes result to `out`. The optional `eps` (default 1e-3) is
 * used to switch to linear interpolation if the angular difference is
 * very small.
 *
 * @param out -
 * @param a -
 * @param b -
 * @param t -
 * @param eps -
 */
export const mixQ = (
	out: Vec | null,
	a: ReadonlyVec,
	b: ReadonlyVec,
	t: number,
	eps = 1e-3
) => {
	const d = dot4(a, b);
	if (Math.abs(d) < 1.0) {
		const theta = Math.acos(d);
		const stheta = Math.sqrt(1 - d * d);
		let u: number, v: number;
		if (Math.abs(stheta) < eps) {
			u = v = 0.5;
		} else {
			u = Math.sin(theta * (1 - t)) / stheta;
			v = Math.sin(theta * t) / stheta;
		}
		!out && (out = a);
		return maddN4(out, b, v, mulN4(out, a, u));
	}
	return a !== out ? set4(out, a) : out;
};
