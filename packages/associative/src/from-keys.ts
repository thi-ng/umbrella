import type { Fn } from "@thi.ng/api";
import { isFunction } from "@thi.ng/checks/is-function";

/**
 * Similar to (but much faster than) `Object.fromEntries()`. Takes an array of
 * property keys and an `init` value or function. If the latter, the `init`
 * function is called for each key and its results are used as values. Otherwise
 * the `init` value is used homogeneously for all keys.
 *
 * @example
 * ```ts tangle:../export/from-keys.ts
 * import { objectFromKeys } from "@thi.ng/associative";
 *
 * console.log(
 *   objectFromKeys(["a", "b", "c"], 1)
 * );
 * // { a: 1, b: 1, c: 1 }
 *
 * console.log(
 *   objectFromKeys(["a", "b", "c"], () => [])
 * );
 * // { a: [], b: [], c: [] }
 *
 * console.log(
 *   objectFromKeys(["a", "b", "c"], (k) => `${k}-${(Math.random()*100)|0}`)
 * );
 * // { a: 'a-54', b: 'b-8', c: 'c-61' }
 * ```
 *
 * @param keys
 * @param init
 */
export const objectFromKeys = <K extends PropertyKey, V>(
	keys: K[],
	init: V | Fn<K, V>
) =>
	keys.reduce(
		isFunction(init)
			? (acc, k) => ((acc[k] = init(k)), acc)
			: (acc, k) => ((acc[k] = init), acc),
		<Record<K, V>>{}
	);
