import type { Keys } from "@thi.ng/api";
import type { Reducer } from "./api.js";
import { reducer } from "./reduce.js";

/**
 * Reducer. Combination of {@link push} and {@link pluck}, which looks up given
 * `key` in each input and collects these values into an array.
 *
 * @remarks
 * Also see {@link pushCopy}, {@link pushSort}.
 *
 * @example
 * ```ts tangle:../export/push-keys.ts
 * import { pushKeys } from "@thi.ng/transducers";
 *
 * const data = [{id: "a", val: 1}, {id: "b", val: 2}, {id: "c", val: 3}];
 *
 * console.log(pushKeys("id", data));
 * // ["a", "b", "c"]
 *
 * console.log(pushKeys("val", data));
 * // [1, 2, 3]
 * ```
 */
export function pushKeys<T, K extends Keys<T>>(key: K): Reducer<T, T[K][]>;
export function pushKeys<T, K extends Keys<T>>(
	key: K,
	src: Iterable<T>
): T[K][];
export function pushKeys<T, K extends Keys<T>>(key: K, src?: Iterable<T>): any {
	return src
		? [...src].map((x) => x[key])
		: reducer<T, T[K][]>(
				() => [],
				(acc, x) => (acc.push(x[key]), acc)
		  );
}
