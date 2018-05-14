import { Predicate2 } from "@thi.ng/api/api";

import { Transducer } from "../api";
import { fuzzyMatch } from "../func/fuzzy-match";
import { filter } from "./filter";

/**
 * Returns transducer which calls `fuzzyMatch()` for each value and
 * discards all non-matching values. The optional `key` fn can be used
 * to extract/produce the actual value used for the search. The optional
 * `eq` predicate can be used to customize item equality checking. Uses
 * @thi.ng/equiv by default.
 *
 * ```
 * [...iterator(filterFuzzy("ho"), ["hello", "hallo", "hey", "heyoka"])]
 * // ["hello", "hallo", "heyoka"]
 * ```
 *
 * @param query
 * @param key
 * @param eq
 */
export function filterFuzzy<A, B>(query: ArrayLike<B>, key?: (x: A) => ArrayLike<B>, eq?: Predicate2<any>): Transducer<A, A> {
    return filter(
        key ?
            (x: A) => fuzzyMatch(key(x), query, eq) :
            (x: A) => fuzzyMatch(<any>x, query, eq)
    );
}
