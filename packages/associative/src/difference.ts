import { into } from "./into";
import { copy, empty } from "./utils";

/**
 * Computes the difference of sets `a - b` and writes results to new set
 * or optionally given set `out` (assumed to be empty for correct
 * results).
 *
 * @param a
 * @param b
 * @param out
 */
export const difference = <T>(a: Set<T>, b: Set<T>, out?: Set<T>): Set<T> => {
    if (a === b) {
        return out || empty(a, Set);
    }
    out = out ? into(out, a) : copy(a, Set);
    for (let i of b) {
        out!.delete(i);
    }
    return out!;
};
