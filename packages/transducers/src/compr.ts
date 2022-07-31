import type { Reducer, ReductionFn } from "./api.js";

/**
 * Reducer composition helper, internally used by various transducers
 * during initialization. Takes existing reducer `rfn` (a 3-tuple) and a
 * reducing function `fn`. Returns a new reducer tuple.
 *
 * @remarks
 * `rfn[2]` reduces values of type `B` into an accumulator of type `A`.
 * `fn` accepts values of type `C` and produces interim results of type
 * `B`, which are then (possibly) passed to the "inner" `rfn[2]`
 * function. Therefore the resulting reducer takes inputs of `C` and an
 * accumulator of type `A`.
 *
 * It is assumed that `fn` internally calls `rfn[2]` to pass its own
 * results for further processing by the nested reducer `rfn`.
 *
 * @example
 * ```ts
 * compR(rfn, fn)
 * // [rfn[0], rfn[1], fn]
 * ```
 *
 * @param rfn -
 * @param fn -
 */
export const compR = <A, B, C>(
	rfn: Reducer<A, B>,
	fn: ReductionFn<A, C>
): Reducer<A, C> => [rfn[0], rfn[1], fn];
