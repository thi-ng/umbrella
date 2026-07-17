// SPDX-License-Identifier: Apache-2.0
import type { TimingResult } from "./api.js";
import { timed, timedAsync, timedResult, timedResultAsync } from "./timed.js";

/**
 * Executes given function `n` times, prints elapsed time to console and
 * returns last result from fn. The optional `prefix` will be displayed
 * with the output, allowing to label different measurements.
 *
 * @param fn - function to time
 * @param n - number of iterations
 */
export const bench = <T>(fn: () => T, n = 1e6, prefix = "") => {
	let res: T;
	return timed(() => {
		while (n-- > 0) {
			res = fn();
		}
		return res;
	}, prefix);
};

/**
 * Async version of {@link bench}.
 *
 * @param fn
 * @param n
 * @param prefix
 */
export const benchAsync = <T>(fn: () => Promise<T>, n = 1e6, prefix = "") => {
	let res: T;
	return timedAsync(async () => {
		while (n-- > 0) {
			res = await fn();
		}
		return res;
	}, prefix);
};

/**
 * Similar to {@link bench}, but produces no output and instead returns
 * tuple of `fn`'s last result and the grand total time measurement.
 *
 * @param fn - function to time
 * @param n - number of iterations
 */
export const benchResult = <T>(fn: () => T, n = 1e6): TimingResult<T> => {
	let res: T;
	return timedResult(() => {
		while (n-- > 0) {
			res = fn();
		}
		return res;
	});
};

/**
 * Async version of {@link benchResult}.
 *
 * @param fn
 * @param n
 */
export const benchResultAsync = <T>(
	fn: () => Promise<T>,
	n = 1e6
): Promise<TimingResult<T>> => {
	let res: T;
	return timedResultAsync(async () => {
		while (n-- > 0) {
			res = await fn();
		}
		return res;
	});
};
