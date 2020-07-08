import type { Reducer } from "@thi.ng/transducers";
import { xformSetOp } from "./internal/xform-setop";
import { into } from "./into";
import { empty } from "./utils";

/**
 * Computes the intersection of sets `a` and `b` and writes results into
 * new set or optionally given set `out` (assumed to be empty for
 * correct results). If `out` is *not* given, the returned Set type will
 * be that of `a` (provided it defines `Symbol.species`).
 *
 * @param a - first set
 * @param b - other set
 * @param out - result set
 */
export const intersection = <T>(a: Set<T>, b: Set<T>, out?: Set<T>): Set<T> => {
    out = out || empty(a, Set);
    if (a === b) {
        return into(out!, a);
    }
    if (b.size < a.size) {
        return intersection(b, a, out);
    }
    for (let i of b) {
        if (a.has(i)) {
            out!.add(i);
        }
    }
    return out!;
};

/**
 * Reducer version of {@link intersection}. If `src` is given returns the
 * reduced intersection of given inputs, else merely returns a reducer
 * to be used with {@link @thi.ng/transducers#(reduce:1)} /
 * {@link @thi.ng/transducers#(transduce:1)} functions.
 *
 * @param src - input collections
 */
export function intersectionR<T>(): Reducer<Set<T>, Iterable<T>>;
export function intersectionR<T>(src: Iterable<Iterable<T>>): Set<T>;
export function intersectionR<T>(src?: Iterable<Iterable<T>>) {
    return xformSetOp<T>(intersectionR, intersection, src);
}
