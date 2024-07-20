import type { Pair, NumOrString, IObjectOf } from "@thi.ng/api";

/**
 * Takes an array of `[key,value]` pairs, adds them to a new (or optionally
 * given) object and returns it.
 *
 * @param src
 * @param dest
 */
export const asObject = <T>(
	src: Pair<NumOrString, T>[],
	dest: IObjectOf<T> = {}
) => src.reduce((acc, [k, v]) => ((acc[k] = v), acc), dest);
