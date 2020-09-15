import type { Fn, Predicate2 } from "@thi.ng/api";
import { fuzzyMatch } from "@thi.ng/arrays";
import type { Transducer } from "../api";
import { $iter } from "../iterator";
import { filter } from "./filter";

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
 * Returns transducer which calls {@link @thi.ng/arrays#fuzzyMatch} for
 * each value and discards all non-matching values.
 *
 * @remarks
 * The `key` option function can be used to extract/produce the actual
 * value used for the search. The `equiv` option predicate can be used
 * to customize item equality checking. Uses {@link @thi.ng/equiv#equiv}
 * by default.
 *
 * @example
 * ```ts
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
    const iter = args.length > 1 && $iter(filterFuzzy, args);
    if (iter) {
        return iter;
    }
    const query: ArrayLike<B> = args[0];
    const { key, equiv } = <FilterFuzzyOpts<A, B>>(args[1] || {});
    return filter((x: A) =>
        fuzzyMatch(key != null ? key(x) : <any>x, query, equiv)
    );
}
