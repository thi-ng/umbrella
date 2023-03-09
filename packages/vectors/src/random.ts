import type { IRandom } from "@thi.ng/random";
import { normal } from "@thi.ng/random/distributions/normal";
import { SYSTEM } from "@thi.ng/random/system";
import type {
	MultiVecOpFNO,
	MultiVecOpOOO,
	ReadonlyVec,
	Vec,
	VecOpFNO,
	VecOpNFO,
	VecOpOOO,
} from "./api.js";
import { defHofOp } from "./compile/emit.js";
import { NEW_OUT_A } from "./index.js";
import { normalize } from "./normalize.js";

/**
 * Sets `v` to random vector, with each component in interval `[n..m)`. If no
 * `rnd` instance is given, uses [`SYSTEM`](https://docs.thi.ng/umbrella/random/variables/SYSTEM.html), i.e.
 * `Math.random`. Creates new vector if `v` is null.
 *
 * @remarks
 * The non-fixed sized version of this function can ONLY be used if `v` is given
 * and initialized to the desired size/length.
 *
 * @param v -
 * @param n - default -1
 * @param m - default 1
 * @param rnd -
 */
export const [random, random2, random3, random4] = defHofOp<
	MultiVecOpOOO<number, number, IRandom>,
	VecOpOOO<number, number, IRandom>
>(
	SYSTEM,
	([a]) => `${a}=rnd.minmax(n,m);`,
	"a,n=-1,m=1,rnd=op",
	"a",
	"a",
	0,
	NEW_OUT_A
);

/**
 * Sets `v` to random vector, with each component drawn from given random
 * distribution function (default: gaussian/normal distribution) and scaled to
 * `n` (default: 1). Creates new vector if `v` is null.
 *
 * @remarks
 * The non-fixed sized version of this function can ONLY be used if `v` is given
 * and initialized to the desired size/length.
 *
 * References:
 * - https://docs.thi.ng/umbrella/random/#random-distributions
 * - https://docs.thi.ng/umbrella/random/functions/normal.html
 *
 * @param v -
 * @param rnd -
 * @param n - default 1
 */
export const [randomDistrib, randomDistrib2, randomDistrib3, randomDistrib4] =
	defHofOp<MultiVecOpFNO, VecOpFNO>(
		normal,
		([a]) => `${a}=rnd()*n;`,
		"a,rnd=op(),n=1",
		"a",
		"a",
		0,
		NEW_OUT_A
	);

const $norm =
	(random: VecOpOOO<number, number, IRandom>) =>
	(v: Vec | null, n = 1, rnd: IRandom = SYSTEM) =>
		normalize(null, random(v, -1, 1, rnd), n);

const $normDist =
	(random: VecOpFNO): VecOpNFO =>
	(v, n = 1, rnd) =>
		normalize(null, random(v, rnd), n);

/**
 * Sets `v` to a random vector (using {@link random}), normalized to length `n`
 * (default: 1). If no `rnd` instance is given, uses
 * [`SYSTEM`](https://docs.thi.ng/umbrella/random/variables/SYSTEM.html), i.e.
 * `Math.random`.
 *
 * @remarks
 * The non-fixed sized version of this function can ONLY be used if `v` is given
 * and initialized to the desired size/length.
 *
 * @param v -
 * @param n -
 * @param rnd -
 */
export const randNorm = $norm(random);
export const randNorm2 = $norm(random2);
export const randNorm3 = $norm(random3);
export const randNorm4 = $norm(random4);

/**
 * Similar to {@link randNorm} but wraps {@link randomDistrib} which draws
 * samples from given distribution function (default: gaussian/normal
 * distribution).
 *
 * @remarks
 * The non-fixed sized version of this function can ONLY be used if `v` is given
 * and pre-initialized to the desired size/length.
 *
 * @param v -
 * @param n -
 * @param distribFn -
 */
export const randNormDistrib = $normDist(randomDistrib);
export const randNormDistrib2 = $normDist(randomDistrib2);
export const randNormDistrib3 = $normDist(randomDistrib3);
export const randNormDistrib4 = $normDist(randomDistrib4);

/**
 * Sets `out` to random vector with each component in the semi-open
 * interval defined by [min,max).
 *
 * @param out -
 * @param min -
 * @param max -
 * @param rnd -
 */
export const [randMinMax, randMinMax2, randMinMax3, randMinMax4] = defHofOp<
	MultiVecOpOOO<ReadonlyVec, ReadonlyVec, IRandom>,
	VecOpOOO<ReadonlyVec, ReadonlyVec, IRandom>
>(
	SYSTEM,
	([o, a, b]) => `${o}=rnd.minmax(${a},${b});`,
	"o,a,b,rnd=op",
	"o,a,b"
);
