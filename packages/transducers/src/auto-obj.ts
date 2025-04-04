// SPDX-License-Identifier: Apache-2.0
import type { IObjectOf } from "@thi.ng/api";
import type { Reducer } from "./api.js";
import { reduce, reducer } from "./reduce.js";

/**
 * Reducer accepting values of any type and assigning them to auto-labeled keys
 * in an object. Keys consist of given `prefix` and monotonically increasing ID.
 *
 * @example
 * ```ts tangle:../export/auto-obj.ts
 * import { autoObj } from "@thi.ng/transducers";
 *
 * console.log(
 *   autoObj("id", ["foo", "bar", "baz"])
 * );
 * // { id0: "foo", id1: "bar", id2: "baz" }
 * ```
 *
 * @param prefix - shared prefix
 */
export function autoObj<T>(prefix: string): Reducer<T, IObjectOf<T>>;
export function autoObj<T>(prefix: string, src: Iterable<T>): IObjectOf<T>;
export function autoObj<T>(prefix: string, src?: Iterable<T>): any {
	let id = 0;
	return src
		? reduce(autoObj(prefix), src)
		: reducer<T, IObjectOf<T>>(
				() => ({}),
				(acc, v) => ((acc[prefix + id++] = v), acc)
		  );
}
