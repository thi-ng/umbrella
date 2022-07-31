import type { Comparator } from "@thi.ng/api";

/**
 * HOF comparator. Returns new comparator with reversed order of given
 * comparator.
 *
 * @param cmp -
 */
export const reverse =
	<T>(cmp: Comparator<T>): Comparator<T> =>
	(a, b) =>
		-cmp(a, b);
