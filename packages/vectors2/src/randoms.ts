import { type IRandom } from "@thi.ng/random";
import { SYSTEM as op } from "@thi.ng/random/system";
import type { VecOpSGOOO, VecOpSOOO } from "./api.js";

/**
 * Like {@link random2} but for 2D strided vectors
 *
 * @param a - output vector
 * @param n - min bounds (default: -1)
 * @param m - max bounds (default: 1)
 * @param rnd - PRNG instance
 * @param ia - index (default: 0)
 * @param sa - stride (default: 1)
 */
export const randomS2: VecOpSOOO<number, number, IRandom> = (
	a,
	n = -1,
	m = 1,
	rnd = op,
	ia = 0,
	sa = 1
) => {
	!a && (a = []);
	a[ia] = rnd.minmax(n, m);
	a[ia + sa] = rnd.minmax(n, m);
	return a;
};

/**
 * Like {@link random3} but for 3D strided vectors
 *
 * @param a - output vector
 * @param n - min bounds (default: -1)
 * @param m - max bounds (default: 1)
 * @param rnd - PRNG instance
 * @param ia - index (default: 0)
 * @param sa - stride (default: 1)
 */
export const randomS3: VecOpSOOO<number, number, IRandom> = (
	a,
	n = -1,
	m = 1,
	rnd = op,
	ia = 0,
	sa = 1
) => {
	!a && (a = []);
	a[ia] = rnd.minmax(n, m);
	a[ia + sa] = rnd.minmax(n, m);
	a[ia + 2 * sa] = rnd.minmax(n, m);
	return a;
};

/**
 * Like {@link random4} but for 4D strided vectors
 *
 * @param a - output vector
 * @param n - min bounds (default: -1)
 * @param m - max bounds (default: 1)
 * @param rnd - PRNG instance
 * @param ia - index (default: 0)
 * @param sa - stride (default: 1)
 */
export const randomS4: VecOpSOOO<number, number, IRandom> = (
	a,
	n = -1,
	m = 1,
	rnd = op,
	ia = 0,
	sa = 1
) => {
	!a && (a = []);
	a[ia] = rnd.minmax(n, m);
	a[ia + sa] = rnd.minmax(n, m);
	a[ia + 2 * sa] = rnd.minmax(n, m);
	a[ia + 3 * sa] = rnd.minmax(n, m);
	return a;
};

/**
 * Like {@link random4} but for 4D strided vectors
 *
 * @param a - output vector
 * @param num - vector size
 * @param n - min bounds (default: -1)
 * @param m - max bounds (default: 1)
 * @param rnd - PRNG instance
 * @param ia - index (default: 0)
 * @param sa - stride (default: 1)
 */
export const randomS: VecOpSGOOO<number, number, IRandom> = (
	a,
	num,
	n = -1,
	m = 1,
	rnd = op,
	ia = 0,
	sa = 1
) => {
	!a && (a = []);
	while (num-- > 0) a[ia + num * sa] = rnd.minmax(n, m);
	return a;
};
