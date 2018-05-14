import { Predicate2 } from "@thi.ng/api/api";
import { equiv } from "@thi.ng/equiv";

/**
 * Performs a fuzzy search of `query` in `domain` and returns `true` if
 * successful. The optional `eq` predicate can be used to customize item
 * equality checking. Uses @thi.ng/equiv by default.
 *
 * Related transducer: `filterFuzzy()` (/xform/filter-fuzzy.ts)
 *
 * Adapted and generalized from:
 * https://github.com/bevacqua/fufuzzyzzysearch (MIT)
 *
 * @param domain
 * @param query
 * @param eq
 */
export function fuzzyMatch<T>(domain: ArrayLike<T>, query: ArrayLike<T>, eq: Predicate2<any> = equiv) {
    const nd = domain.length;
    const nq = query.length;
    if (nq > nd) {
        return false;
    }
    if (nq === nd) {
        return eq(query, domain);
    }
    next:
    for (let i = 0, j = 0; i < nq; i++) {
        const q = query[i];
        while (j < nd) {
            if (eq(domain[j++], q)) {
                continue next;
            }
        }
        return false;
    }
    return true;
}
