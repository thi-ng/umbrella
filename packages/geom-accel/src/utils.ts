// thing:no-export
import type { Fn, Fn3, Nullable, Pair } from "@thi.ng/api";

/** @internal */
export const CMP = (a: [number, any?], b: [number, any?]) => b[0] - a[0];

/** @internal */
export const addResults = <A, B>(
	fn: Fn<A, B>,
	sel: [number, Nullable<A>?][],
	acc: B[]
) => {
	for (let n = sel.sort(CMP).length; n-- > 0; ) {
		const s = sel[n][1];
		s && acc.push(fn(s));
	}
	return acc;
};

/**
 * Shared `into()` impl for spatial map types.
 *
 * @param map -
 * @param pairs -
 * @param eps -
 *
 * @internal
 */
export const into = <K, V>(
	map: { set: Fn3<K, V, number, boolean> },
	pairs: Iterable<Pair<K, V>>,
	eps: number
) => {
	let ok = true;
	for (let p of pairs) {
		ok = map.set(p[0], p[1], eps) && ok;
	}
	return ok;
};
