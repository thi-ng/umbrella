// SPDX-License-Identifier: Apache-2.0
import { type IRandom } from "@thi.ng/random";
import { SYSTEM } from "@thi.ng/random/system";
import type { VecOpOOO } from "./api.js";

/**
 * Sets `a` to random 2D vector, with each component in the semi-open interval
 * `[b,c)`. If no `rnd` instance is given, uses
 * [`SYSTEM`](https://docs.thi.ng/umbrella/random/variables/SYSTEM.html).
 * Creates new vector if `a` is null.
 *
 * **IMPORTANT:** The non-fixed sized version of this function can ONLY be used
 * if `a` is given and initialized to the desired size/length.
 *
 * @param a - vector
 * @param b - scalar (min. bounds, default: -1)
 * @param c - scalar (max. bounds, default: 1)
 * @param rnd - PRNG instance
 */
export const random2: VecOpOOO<number, number, IRandom> = (
	a,
	n = -1,
	m = 1,
	rnd = SYSTEM
) => {
	!a && (a = []);
	a[0] = rnd.minmax(n, m);
	a[1] = rnd.minmax(n, m);
	return a;
};

/**
 * Sets `a` to random 3D vector, with each component in the semi-open interval
 * `[b,c)`. If no `rnd` instance is given, uses
 * [`SYSTEM`](https://docs.thi.ng/umbrella/random/variables/SYSTEM.html).
 * Creates new vector if `a` is null.
 *
 * **IMPORTANT:** The non-fixed sized version of this function can ONLY be used
 * if `a` is given and initialized to the desired size/length.
 *
 * @param a - vector
 * @param b - scalar (min. bounds, default: -1)
 * @param c - scalar (max. bounds, default: 1)
 * @param rnd - PRNG instance
 */
export const random3: VecOpOOO<number, number, IRandom> = (
	a,
	n = -1,
	m = 1,
	rnd = SYSTEM
) => {
	!a && (a = []);
	a[0] = rnd.minmax(n, m);
	a[1] = rnd.minmax(n, m);
	a[2] = rnd.minmax(n, m);
	return a;
};

/**
 * Sets `a` to random 4D vector, with each component in the semi-open interval
 * `[b,c)`. If no `rnd` instance is given, uses
 * [`SYSTEM`](https://docs.thi.ng/umbrella/random/variables/SYSTEM.html).
 * Creates new vector if `a` is null.
 *
 * **IMPORTANT:** The non-fixed sized version of this function can ONLY be used
 * if `a` is given and initialized to the desired size/length.
 *
 * @param a - vector
 * @param b - scalar (min. bounds, default: -1)
 * @param c - scalar (max. bounds, default: 1)
 * @param rnd - PRNG instance
 */
export const random4: VecOpOOO<number, number, IRandom> = (
	a,
	n = -1,
	m = 1,
	rnd = SYSTEM
) => {
	!a && (a = []);
	a[0] = rnd.minmax(n, m);
	a[1] = rnd.minmax(n, m);
	a[2] = rnd.minmax(n, m);
	a[3] = rnd.minmax(n, m);
	return a;
};

/**
 * Sets `a` to random vector, with each component in the semi-open interval
 * `[b,c)`. If no `rnd` instance is given, uses
 * [`SYSTEM`](https://docs.thi.ng/umbrella/random/variables/SYSTEM.html).
 * Creates new vector if `a` is null.
 *
 * **IMPORTANT:** The non-fixed sized version of this function can ONLY be used
 * if `a` is given and initialized to the desired size/length.
 *
 * @param a - vector
 * @param b - scalar (min. bounds, default: -1)
 * @param c - scalar (max. bounds, default: 1)
 * @param rnd - PRNG instance
 */
export const random: VecOpOOO<number, number, IRandom> = (
	a,
	n = -1,
	m = 1,
	rnd = SYSTEM
) => {
	!a && (a = []);
	for (let i = a.length; i-- > 0; ) a[i] = rnd.minmax(n, m);
	return a;
};
