import type { Comparator } from "@thi.ng/api";
import { compare } from "@thi.ng/compare/compare";
import type { Reducer } from "./api.js";

/**
 * Similar to {@link push}, but sorts result array upon completion using
 * optionally given comparator (default
 * [`compare()`](https://docs.thi.ng/umbrella/compare/functions/compare.html)).
 *
 * @param cmp -
 */
export function pushSort<T>(cmp?: Comparator<T>): Reducer<T[], T>;
export function pushSort<T>(cmp: Comparator<T>, xs: Iterable<T>): T[];
export function pushSort<T>(
	cmp: Comparator<T> = compare,
	xs?: Iterable<T>
): any {
	return xs
		? [...xs].sort(cmp)
		: <Reducer<T[], T>>[
				() => [],
				(acc) => acc.sort(cmp),
				(acc, x) => (acc.push(x), acc),
		  ];
}
