import type { Comparator } from "@thi.ng/api";
import { compare } from "@thi.ng/compare/compare";
import type { Reducer } from "./api.js";

/**
 * Similar to {@link (push:1)}, but sorts result array upon completion
 * using optionally given comparator (default
 * {@link @thi.ng/compare#compare}).
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
