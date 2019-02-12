import { Predicate2 } from "@thi.ng/api";
import { equiv as _eq } from "@thi.ng/equiv";

/**
 * Performs a fuzzy search of `query` in `domain` and returns `true` if
 * successful.
 *
 * The optional `equiv` predicate can be used to customize
 * item equality checking. Uses @thi.ng/equiv by default.
 *
 * Adapted and generalized from:
 * https://github.com/bevacqua/fufuzzyzzysearch (MIT)
 *
 * @see thi.ng/transducers/xform/filterFuzzy
 *
 * @param query
 * @param domain
 * @param equiv
 */
export const fuzzyMatch = <T>(
    query: ArrayLike<T>,
    domain: ArrayLike<T>,
    equiv: Predicate2<any> = _eq
) => {
    const nd = domain.length;
    const nq = query.length;
    if (nq > nd) {
        return false;
    }
    if (nq === nd) {
        return equiv(query, domain);
    }
    next:
    for (let i = 0, j = 0; i < nq; i++) {
        const q = query[i];
        while (j < nd) {
            if (equiv(domain[j++], q)) {
                continue next;
            }
        }
        return false;
    }
    return true;
};
