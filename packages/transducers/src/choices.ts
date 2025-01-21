// SPDX-License-Identifier: Apache-2.0
import { ensureArray } from "@thi.ng/arrays/ensure-array";
import type { IRandom } from "@thi.ng/random";
import { SYSTEM } from "@thi.ng/random/system";
import { weightedRandom } from "@thi.ng/random/weighted-random";
import { repeatedly } from "./repeatedly.js";

/**
 * Returns an infinite iterator of random choices and their (optional) weights.
 * If `weights` is given, it must have at least the same size as `choices`. If
 * omitted, each choice will have same probability.
 *
 * @remarks
 * Internally uses
 * [`weightedRandom()`](https://docs.thi.ng/umbrella/random/functions/weightedRandom.html).
 *
 * @example
 * ```ts tangle:../export/choices.ts
 * import { choices, frequencies, take, transduce } from "@thi.ng/transducers";
 *
 * const res = transduce(
 *   take(1000),
 *   frequencies(),
 *   choices("abcd", [1, 0.5, 0.25, 0.125])
 * );
 *
 * console.log(res);
 * // Map(4) {
 * //   "a": 544,
 * //   "b": 263,
 * //   "c": 131,
 * //   "d": 62,
 * // }
 * ```
 *
 * @param choices -
 * @param weights -
 */
export const choices = <T>(
	choices: ArrayLike<T> & Iterable<T>,
	weights?: ArrayLike<number>,
	rnd: IRandom = SYSTEM
): IterableIterator<T> =>
	repeatedly(
		weights
			? weightedRandom(ensureArray(choices), weights, rnd)
			: () => choices[rnd.float(choices.length) | 0]
	);
