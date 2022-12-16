import type { Predicate2 } from "@thi.ng/api";
import { equiv as _eq } from "@thi.ng/equiv";

/**
 * Performs a fuzzy search of `query` in `domain` and returns `true` if
 * successful.
 *
 * @remarks
 * The optional `equiv` predicate can be used to customize item equality
 * checking. Uses
 * [`equiv()`](https://docs.thi.ng/umbrella/equiv/functions/equiv.html) by
 * default.
 *
 * Adapted and generalized from: https://github.com/bevacqua/fufuzzyzzysearch
 * (MIT licensed)
 *
 * [`filterFuzzy()`](https://docs.thi.ng/umbrella/transducers/functions/filterFuzzy.html)
 *
 * @param domain - array
 * @param query - search value
 * @param equiv - equivalence predicate
 */
export const fuzzyMatch = <T>(
	domain: ArrayLike<T>,
	query: ArrayLike<T>,
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
	next: for (let i = 0, j = 0; i < nq; i++) {
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
