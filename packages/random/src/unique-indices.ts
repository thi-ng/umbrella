// SPDX-License-Identifier: Apache-2.0
import type { Fn0 } from "@thi.ng/api";
import { assert } from "@thi.ng/errors/assert";
import type { IRandom } from "./api.js";
import { SYSTEM } from "./system.js";

/**
 * Attempts to draw `k` unique values from given zero-arg function `fn`
 * (presumably a PRNG of sorts) and adds them to `existing` array of unique
 * samples (or creates a new one). Returns the array. Gives up after
 * `maxTrials`.
 *
 * @remarks
 * Internally uses `Array.includes()` to check for duplicates.
 *
 * @param k -
 * @param fn -
 * @param existing -
 * @param maxTrials -
 */
export const uniqueValuesFrom = <T>(
	k: number,
	fn: Fn0<T>,
	existing: T[] = [],
	maxTrials = 100
) => {
	let n = 0;
	while (n < k) {
		let i: T;
		let trials = maxTrials;
		do {
			i = fn();
		} while (existing.includes(i) && --trials > 0);
		if (trials <= 0) break;
		existing.push(i);
		n++;
	}
	return existing;
};

/**
 * Similar to (and based on) {@link uniqueValuesFrom}. Attempts to add `k`
 * unique integer indices in the `[0, max)` interval to the (optional) array of
 * pre-`existing` indices (which will never be picked again and new indices will
 * be added to). Returns updated array.
 *
 * @remarks
 * Candidates are drawn from the provided `rnd` {@link IRandom} (default:
 * {@link SYSTEM}) and only `maxTrials` are attempted before giving up.
 *
 * @param k -
 * @param max -
 * @param existing -
 * @param maxTrials -
 * @param rnd -
 */
export const uniqueIndices = (
	k: number,
	max: number,
	existing?: number[],
	maxTrials = max,
	rnd: IRandom = SYSTEM
) => {
	assert(k >= 0 && k <= max, `k must be in [0, ${max}] interval`);
	return uniqueValuesFrom(k, () => rnd.int() % max, existing, maxTrials);
};

/**
 * Combination of {@link pickRandom} and {@link uniqueValuesFrom}. Picks up to
 * `k` unique values from `src` array (each with `maxTrials`) and adds them to
 * given `existing` array (or creates a new one by default) and returns it. Uses
 * given `rnd` instance (default: {@link SYSTEM} to randomly select candidates.
 *
 * @remarks
 * Internally uses `Array.includes()` to check for duplicates.
 *
 * @param k
 * @param src
 * @param existing
 * @param maxTrials
 * @param rnd
 */
export const pickRandomUnique = <T>(
	k: number,
	src: T[],
	existing?: T[],
	maxTrials = 100,
	rnd: IRandom = SYSTEM
) =>
	uniqueValuesFrom(k, () => src[rnd.int() % src.length], existing, maxTrials);
