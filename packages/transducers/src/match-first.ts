import type { Maybe, Predicate } from "@thi.ng/api";
import { isIterable } from "@thi.ng/checks/is-iterable";
import type { Transducer } from "./api.js";
import { comp } from "./comp.js";
import { filter } from "./filter.js";
import { iterator1 } from "./iterator.js";
import { take } from "./take.js";

/**
 * Transducer. Yields none or only the first value which passed the predicate
 * check and then causes early termination. If `src` input is given, returns
 * first match found (or `undefined`). Also see {@link matchLast}.
 *
 * @remarks
 * `matchFirst()` is syntax sugar for: `comp(filter(pred), take(1))`
 *
 * @example
 * ```ts tangle:../export/match-first.ts
 * import {
 *   comp, map, matchFirst, push, transduce
 * } from "@thi.ng/transducers";
 *
 * console.log(
 *   matchFirst((x) => x >= 5, [3, 1, 4, 2, 6, 5])
 * );
 * // 6
 *
 * const res = transduce(
 *   comp(
 *     matchFirst((x) => x >= 5),
 *     map((x) => x * 10)
 *   ),
 *   push(),
 *   [3, 1, 4, 2, 6, 5]
 * );
 *
 * console.log(res);
 * // [60]
 * ```
 *
 * @param pred - predicate function
 */
export function matchFirst<T>(pred: Predicate<T>): Transducer<T, T>;
export function matchFirst<T>(pred: Predicate<T>, src: Iterable<T>): Maybe<T>;
export function matchFirst<T>(pred: Predicate<T>, src?: Iterable<T>): any {
	return isIterable(src)
		? [...iterator1(matchFirst(pred), src)][0]
		: comp(filter(pred), take(1));
}
