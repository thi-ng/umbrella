import type { Reducer } from "./api.js";
import { reducer } from "./reduce.js";

/**
 * Reducer. Special version of {@link push}, which immutably appends inputs to
 * an array, yielding a new array for each reduction step.
 *
 * @remarks
 * Also see {@link pushKeys}, {@link pushSort}.
 */
export const pushCopy = <T>(): Reducer<T, T[]> =>
	reducer<T, T[]>(
		() => [],
		(acc, x) => acc.concat([x])
	);
