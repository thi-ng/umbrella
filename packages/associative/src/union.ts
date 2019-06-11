import { into } from "./into";
import { copy } from "./utils";

/**
 * Computes union of sets `a` and `b` and writes results to new set or
 * optionally given set `out` (assumed to be empty for correct results).
 *
 * @param a
 * @param b
 * @param out
 */
export const union = <T>(a: Set<T>, b: Set<T>, out?: Set<T>): Set<T> => {
    out = out ? into(out, a) : copy(a, Set);
    return a === b ? out! : into(out!, b);
};
