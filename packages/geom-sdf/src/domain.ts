import { cossin } from "@thi.ng/math";
import { TAU } from "@thi.ng/math/api";
import { mod } from "@thi.ng/math/prec";
import { add2 } from "@thi.ng/vectors/add";
import type { ReadonlyVec, Vec } from "@thi.ng/vectors/api";
import { div2 } from "@thi.ng/vectors/div";
import { floor2 } from "@thi.ng/vectors/floor";
import { mag } from "@thi.ng/vectors/mag";
import { mod2 } from "@thi.ng/vectors/mod";
import { modN2 } from "@thi.ng/vectors/modn";
import { mul2 } from "@thi.ng/vectors/mul";
import { mulN2 } from "@thi.ng/vectors/muln";
import { sub2 } from "@thi.ng/vectors/sub";
import { subN2 } from "@thi.ng/vectors/subn";

/**
 * @remarks
 * Ported from: HG_SDF by Mercury Demogroup
 * https://mercury.sexy/hg_sdf/
 *
 * @param size
 */
export const repeat2 = (size: ReadonlyVec) => {
	const s2 = mulN2([], size, 0.5);
	return (p: ReadonlyVec) =>
		sub2(null, mod2(null, add2([], s2, p), size), s2);
};

/**
 * @remarks
 * Ported from: HG_SDF by Mercury Demogroup
 * https://mercury.sexy/hg_sdf/
 *
 * @param size
 */
export const repeatMirror2 = (size: ReadonlyVec) => {
	const c: Vec = [];
	const s2 = mulN2([], size, 0.5);
	return (p: ReadonlyVec) =>
		mul2(
			null,
			sub2(null, mod2(null, add2([], s2, p), size), s2),
			subN2(
				null,
				mulN2(
					null,
					modN2(
						null,
						floor2(null, div2(null, add2(c, s2, p), size)),
						2
					),
					2
				),
				1
			)
		);
};

/**
 * @remarks
 * Ported from: HG_SDF by Mercury Demogroup
 * https://mercury.sexy/hg_sdf/
 *
 * @param size
 */
export const repeatGrid2 = (size: ReadonlyVec) => {
	const s2 = mulN2([], size, 0.5);
	const rm = repeatMirror2(size);
	return (p: ReadonlyVec) => {
		p = sub2(null, rm(p), s2);
		return p[0] > p[1] ? [p[1], p[0]] : p;
	};
};

/**
 * @remarks
 * Ported from: HG_SDF by Mercury Demogroup
 * https://mercury.sexy/hg_sdf/
 *
 * @param n - number of repetition
 */
export const repeatPolar2 = (n: number) => {
	const theta = TAU / n;
	const halfTheta = theta / 2;
	return (p: ReadonlyVec) =>
		cossin(
			mod(Math.atan2(p[1], p[0]) + halfTheta, theta) - halfTheta,
			mag(p)
		);
};
