import type { Reducer } from "@thi.ng/transducers";
import { copy } from "./copy.js";
import { __combineSet } from "./internal/combine.js";
import { into } from "./into.js";

/**
 * Computes union of sets `a` and `b` and writes results to new set or
 * optionally given set `out` (assumed to be empty for correct results).
 *
 * @param a - first set
 * @param b - other set
 * @param out - result set
 */
export const union = <T>(a: Set<T>, b: Set<T>, out?: Set<T>): Set<T> => {
	if (a.size < b.size) {
		const t = a;
		a = b;
		b = t;
	}
	out = out ? into(out, a) : copy(a, Set);
	return a === b ? out! : into(out!, b);
};

/**
 * Reducer version of {@link union}. If `src` is given returns the reduced
 * union of given inputs, else merely returns a reducer to be used with
 * {@link @thi.ng/transducers#(reduce:1)} /
 * {@link @thi.ng/transducers#(transduce:1)} functions.
 *
 * @param src - input collections
 */
export function unionR<T>(): Reducer<Set<T>, Iterable<T>>;
export function unionR<T>(src: Iterable<Iterable<T>>): Set<T>;
export function unionR<T>(src?: Iterable<Iterable<T>>) {
	return __combineSet<T>(unionR, union, src);
}
