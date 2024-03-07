import type { Predicate } from "@thi.ng/api";
import { isIterable } from "@thi.ng/checks/is-iterable";
import type { Transducer } from "./api.js";
import { comp } from "./comp.js";
import { filter } from "./filter.js";
import { iterator } from "./iterator.js";
import { takeLast } from "./take-last.js";

/**
 * Similar to {@link matchFirst}, but matches yields none or only the **last**
 * value which passed the predicate check. If `src` input is given, returns last
 * match found (or `undefined`).
 *
 * @example
 * ```ts
 * import { comp, map, matchLast, push, transduce } from "@thi.ng/transducers";
 *
 * matchLast((x) => x >= 5, [3, 1, 6, 5, 4, 2])
 * // 5
 *
 * transduce(
 *   comp(
 *     matchLast((x) => x >= 5),
 *     map((x) => x * 10)
 *   ),
 *   push(),
 *   [3, 1, 6, 5, 4, 2]
 * )
 * // 50
 * ```
 *
 * @param pred - predicate function
 */
export function matchLast<T>(pred: Predicate<T>): Transducer<T, T>;
export function matchLast<T>(
	pred: Predicate<T>,
	src: Iterable<T>
): T | undefined;
export function matchLast<T>(pred: Predicate<T>, src?: Iterable<T>): any {
	return isIterable(src)
		? [...iterator(matchLast(pred), src)][0]
		: comp(filter(pred), takeLast(1));
}
