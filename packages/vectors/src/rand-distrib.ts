import { normal } from "@thi.ng/random/distributions/normal";
import type { MultiVecOpFNO, VecOpFNO } from "./api.js";
import { defHofOp } from "./compile/emit.js";
import { NEW_OUT_A } from "./compile/templates.js";

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
export const [randDistrib, randDistrib2, randDistrib3, randDistrib4] = defHofOp<
	MultiVecOpFNO,
	VecOpFNO
>(normal, ([a]) => `${a}=rnd()*n;`, "a,rnd=op(),n=1", "a", "a", 0, NEW_OUT_A);

/** @deprecated renamed to {@link randDistrib} */
export const randomDistrib = randDistrib;

/** @deprecated renamed to {@link randDistrib2} */
export const randomDistrib2 = randDistrib2;

/** @deprecated renamed to {@link randDistrib3} */
export const randomDistrib3 = randDistrib3;

/** @deprecated renamed to {@link randDistrib4} */
export const randomDistrib4 = randDistrib4;
