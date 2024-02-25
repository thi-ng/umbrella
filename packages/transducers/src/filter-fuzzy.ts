import type { Fn, Predicate2 } from "@thi.ng/api";
import { fuzzyMatch } from "@thi.ng/arrays/fuzzy-match";
import type { Transducer } from "./api.js";
import { __iter } from "./iterator.js";
import { filter } from "./filter.js";

export interface FilterFuzzyOpts<A, B> {
	/**
	 * Key extractor function.
	 */
	key: Fn<A, ArrayLike<B>>;
	/**
	 * Equivalence predicate function.
	 */
	equiv: Predicate2<any>;
}

/**
 * Returns transducer which calls
 * [`fuzzyMatch()`](https://docs.thi.ng/umbrella/arrays/functions/fuzzyMatch.html)
 * for each value and discards all non-matching values.
 *
 * @remarks
 * The `key` option function can be used to extract/produce the actual value
 * used for the search. The `equiv` option predicate can be used to customize
 * item equality checking. Uses
 * [`equiv()`](https://docs.thi.ng/umbrella/equiv/functions/equiv.html) by
 * default.
 *
 * @example
 * ```ts
 * import { filterFuzzy } from "@thi.ng/transducers";
 *
 * [...filterFuzzy("ho", ["hello", "hallo", "hey", "heyoka"])]
 * // ["hello", "hallo", "heyoka"]
 * ```
 *
 * @param opts -
 * @param src -
 */
export function filterFuzzy<A, B>(
	query: ArrayLike<B>,
	opts?: Partial<FilterFuzzyOpts<A, B>>
): Transducer<A, A>;
export function filterFuzzy<A, B>(
	query: ArrayLike<B>,
	src: Iterable<A>
): IterableIterator<A>;
export function filterFuzzy<A, B>(
	query: ArrayLike<B>,
	opts: Partial<FilterFuzzyOpts<A, B>>,
	src: Iterable<A>
): IterableIterator<A>;
export function filterFuzzy<A, B>(...args: any[]): any {
	const iter = args.length > 1 && __iter(filterFuzzy, args);
	if (iter) {
		return iter;
	}
	const query: ArrayLike<B> = args[0];
	const { key, equiv } = <FilterFuzzyOpts<A, B>>(args[1] || {});
	return filter((x: A) =>
		fuzzyMatch(key != null ? key(x) : <any>x, query, equiv)
	);
}
