import type { IRandom } from "@thi.ng/random";
import { normal } from "@thi.ng/random/distributions/normal";
import { SYSTEM } from "@thi.ng/random/system";
import type {
	VecOpSFN,
	VecOpSGFN,
	VecOpSGOO,
	VecOpSGOOO,
	VecOpSGVVO,
	VecOpSOO,
	VecOpSOOO,
	VecOpSVO,
	VecOpSVVO,
} from "./api.js";
import { defHofOpS } from "./compile/emit.js";
import { NEW_OUT_A, SARGS_VV } from "./compile/templates.js";
import {
	normalizeS,
	normalizeS2,
	normalizeS3,
	normalizeS4,
} from "./normalizes.js";

/**
 * Randomizes `v` with each component in interval `[n..m)`. If no `rnd`
 * instance is given, uses {@link @thi.ng/random#SYSTEM}, i.e.
 * `Math.random`.
 *
 * @param v -
 * @param n - default -1
 * @param m - default 1
 * @param rnd -
 * @param ia -
 * @param sa -
 */
export const [randomS, randomS2, randomS3, randomS4] = defHofOpS<
	VecOpSGOOO<number, number, IRandom>,
	VecOpSOOO<number, number, IRandom>
>(
	SYSTEM,
	([a]) => `${a}=rnd.minmax(n,m);`,
	"a",
	"n=-1,m=1,rnd=op,ia=0,sa=1",
	"a",
	"a",
	NEW_OUT_A
);

export const [
	randomDistribS,
	randomDistribS2,
	randomDistribS3,
	randomDistribS4,
] = defHofOpS<VecOpSGFN, VecOpSFN>(
	normal,
	([a]) => `${a}=rnd()*n;`,
	"a",
	"rnd=op(),n=1,ia=0,sa=1",
	"a",
	"a",
	NEW_OUT_A
);

const $norm =
	(
		normalize: VecOpSVO<number>,
		random: VecOpSOOO<number, number, IRandom>
	): VecOpSOO<number, IRandom> =>
	(a, n = 1, rnd?, ia = 0, sa = 1) =>
		normalize(null, random(a, -1, 1, rnd, ia, sa), n, ia, ia, sa, sa);

const $normDist =
	(normalize: VecOpSVO<number>, random: VecOpSFN): VecOpSFN =>
	(a, rnd, n = 1, ia = 0, sa = 1) =>
		normalize(null, random(a, rnd, 1, ia, sa), n, ia, ia, sa, sa);

/**
 * Sets `v` to random strided vector, normalized to length `n` (default: 1). If
 * no `rnd` instance is given, uses {@link @thi.ng/random#SYSTEM}, i.e.
 * `Math.random`.
 *
 * @param v -
 * @param num -
 * @param n -
 * @param rnd -
 * @param ia -
 * @param sa -
 */
export const randNormS: VecOpSGOO<number, IRandom> = (
	a,
	num,
	n = 1,
	rnd?,
	ia = 0,
	sa = 1
) =>
	normalizeS(
		(a = randomS(a, num, -1, 1, rnd, ia, sa)),
		a,
		num,
		n,
		ia,
		ia,
		sa,
		sa
	);

export const randNormS2 = $norm(normalizeS2, randomS2);
export const randNormS3 = $norm(normalizeS3, randomS3);
export const randNormS4 = $norm(normalizeS4, randomS4);

export const randNormDistribS: VecOpSGFN = (
	a,
	num,
	rnd,
	n = 1,
	ia = 0,
	sa = 1
) =>
	normalizeS(
		null,
		randomDistribS(a, num, rnd, 1, ia, sa),
		num,
		n,
		ia,
		ia,
		sa,
		sa
	);

export const randNormDistribS2 = $normDist(normalizeS2, randomDistribS2);
export const randNormDistribS3 = $normDist(normalizeS3, randomDistribS3);
export const randNormDistribS4 = $normDist(normalizeS4, randomDistribS4);

/**
 * Sets `out` to random vector with each component in the semi-open
 * interval defined by [min,max).
 *
 * @param out -
 * @param min -
 * @param max -
 * @param rnd -
 */
export const [randMinMaxS, randMinMaxS2, randMinMaxS3, randMinMaxS4] =
	defHofOpS<VecOpSGVVO<IRandom>, VecOpSVVO<IRandom>>(
		SYSTEM,
		([o, a, b]) => `${o}=rnd.minmax(${a},${b});`,
		"o,a,b",
		`rnd=op,${SARGS_VV}`,
		"o,a,b"
	);
