// SPDX-License-Identifier: Apache-2.0
import type { Comparator } from "@thi.ng/api";
import type { IRandom } from "@thi.ng/random";

/**
 * SortedMapOpts implementation config settings.
 */
export interface SortedMapOpts<K> {
	/**
	 * Key comparison function. Must follow standard comparator contract and
	 * return:
	 * - negative if `a < b`
	 * - positive if `a > b`
	 * - `0` if `a == b`
	 *
	 * Note: The {@link SortedMap} implementation only uses `<` and `==` style
	 * comparisons.
	 *
	 * @defaultValue
	 * [`compare`](https://docs.thi.ng/umbrella/compare/functions/compare.html)
	 */
	compare: Comparator<K>;
	/**
	 * Probability for a value to exist in any express lane of the
	 * underlying Skip List implementation.
	 *
	 * @defaultValue `1 / Math.E`
	 */
	probability: number;
	/**
	 * Random number generator for choosing new insertion levels. By default
	 * uses
	 * [`SYSTEM`](https://docs.thi.ng/umbrella/random/variables/SYSTEM.html)
	 * from thi.ng/random pkg.
	 */
	rnd: IRandom;
}

export type SortedSetOpts<T> = SortedMapOpts<T>;
