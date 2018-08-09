import { Fn, Predicate2 } from "@thi.ng/api/api";

import { Transducer } from "../api";
import { fuzzyMatch } from "../func/fuzzy-match";
import { $iter } from "../iterator";
import { filter } from "./filter";

export interface FilterFuzzyOpts<A, B> {
    key: Fn<A, ArrayLike<B>>;
    equiv: Predicate2<any>;
}

/**
 * Returns transducer which calls `fuzzyMatch()` for each value and
 * discards all non-matching values. The optional `key` fn can be used
 * to extract/produce the actual value used for the search. The optional
 * `eq` predicate can be used to customize item equality checking. Uses
 * @thi.ng/equiv by default.
 *
 * ```
 * [...filterFuzzy({query: "ho"}, ["hello", "hallo", "hey", "heyoka"])]
 * // ["hello", "hallo", "heyoka"]
 * ```
 *
 * @param opts
 * @param src
 */
export function filterFuzzy<A, B>(query: ArrayLike<B>, opts?: Partial<FilterFuzzyOpts<A, B>>): Transducer<A, A>;
export function filterFuzzy<A, B>(query: ArrayLike<B>, src: Iterable<A>): IterableIterator<A>;
export function filterFuzzy<A, B>(query: ArrayLike<B>, opts: Partial<FilterFuzzyOpts<A, B>>, src: Iterable<A>): IterableIterator<A>;
export function filterFuzzy<A, B>(...args: any[]): any {
    const iter = args.length > 1 && $iter(filterFuzzy, args);
    if (iter) {
        return iter;
    }
    const query: ArrayLike<B> = args[0];
    const { key, equiv } = <FilterFuzzyOpts<A, B>>(args[1] || {});
    return filter(
        (x: A) => fuzzyMatch(key != null ? key(x) : <any>x, query, equiv)
    );
}
