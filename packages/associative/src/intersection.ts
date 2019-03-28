import { into } from "./into";
import { empty } from "./utils";

/**
 * Computes the intersection of sets `a` and `b` and writes results into
 * new set or optionally given set `out` (assumed to be empty for
 * correct results). If `out` is *not* given, the returned Set type will
 * be that of `a` (provided it defines `Symbol.species`).
 *
 * @param a
 * @param b
 * @param out
 */
export const intersection = <T>(a: Set<T>, b: Set<T>, out?: Set<T>): Set<T> => {
    out = out || empty(a, Set);
    if (a === b) {
        return into(out, a);
    }
    if (b.size < a.size) {
        return intersection(b, a, out);
    }
    for (let i of b) {
        if (a.has(i)) {
            out.add(i);
        }
    }
    return out;
};
