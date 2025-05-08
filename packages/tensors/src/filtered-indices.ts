import type { Predicate } from "@thi.ng/api";
import { defOpRT } from "./defoprt.js";

/**
 * Higher order function. Takes a predicate function and returns a new function
 * which accepts a tensor and then returns an array of tensor component indices
 * for which the predicate passed.
 *
 * @remarks
 * Also see {@link nonZeroIndices}.
 *
 * @param pred
 */
export const filteredIndices = <T = number>(pred: Predicate<T>) =>
	defOpRT<T, number[]>(
		(acc, data, i) => {
			if (pred(data[i])) acc.push(i);
			return acc;
		},
		() => []
	);

/**
 * Returns an array of indices where the given tensor has non-zero component
 * values.
 *
 * @param a
 */
export const nonZeroIndices = filteredIndices((x) => x !== 0);

/**
 * Returns an array of indices where the given tensor has negative component
 * values.
 *
 * @param a
 */
export const negativeIndices = filteredIndices((x) => x < 0);

/**
 * Returns an array of indices where the given tensor has positive component
 * values.
 *
 * @param a
 */
export const positiveIndices = filteredIndices((x) => x > 0);
