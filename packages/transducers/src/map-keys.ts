// SPDX-License-Identifier: Apache-2.0
import type { Fn2, IObjectOf } from "@thi.ng/api";
import type { Transducer } from "./api.js";
import { __iter } from "./iterator.js";
import { map } from "./map.js";

/**
 * Takes a `keys` object of transformation functions and returns a
 * transducer which expects object values. For each input `x` then calls
 * transformation functions for each key `k` in `keys`. I.e. executes
 * `keys[k](x[k], x)` and reassigns result. By default creates a shallow
 * copy of each `x`.
 *
 * @example
 * ```ts tangle:../export/map-keys.ts
 * import { mapKeys } from "@thi.ng/transducers";
 *
 * const res = [...mapKeys(
 *   {
 *     a: (x) => x != null ? x * 10 : x,
 *     b: (x) => x != null ? x * 100: "n/a"
 *   },
 *   [{a: 1, b: 2}, {c: 3, d: 4}]
 * )];
 *
 * console.log(res);
 * // [ { a: 10, b: 200 }, { c: 3, d: 4, b: 'n/a', a: undefined } ]
 * ```
 *
 * @param keys - object of transformation functions
 * @param copy - if true (default), creates a shallow copy of each incoming value
 */
export function mapKeys(
	keys: IObjectOf<Fn2<any, any, any>>,
	copy?: boolean
): Transducer<any, any>;
export function mapKeys(
	keys: IObjectOf<Fn2<any, any, any>>,
	src: Iterable<any>
): IterableIterator<any>;
export function mapKeys(
	keys: IObjectOf<Fn2<any, any, any>>,
	copy: boolean,
	src: Iterable<any>
): IterableIterator<any>;
export function mapKeys(...args: any[]): any {
	const iter = __iter(mapKeys, args);
	if (iter) {
		return iter;
	}
	const keys: IObjectOf<Fn2<any, any, any>> = args[0];
	const copy = args[1] !== false;
	return map((x: any) => {
		const res: any = copy ? Object.assign({}, x) : x;
		for (let k in keys) {
			res[k] = keys[k](x[k], x);
		}
		return res;
	});
}
