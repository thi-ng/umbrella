// SPDX-License-Identifier: Apache-2.0
import type { MaybeAsyncIterable } from "@thi.ng/api";
import type { AsyncReducer } from "./api.js";
import { reducer } from "./reduce.js";

/**
 * Async reducer which concatenates inputs into a string, each value separated
 * by `sep` (default: "").
 *
 * @param sep
 */
export function str<T>(sep?: string): AsyncReducer<T, string>;
export function str<T>(
	sep: string,
	src: MaybeAsyncIterable<T>
): Promise<string>;
export function str<T>(sep = "", src?: MaybeAsyncIterable<T>) {
	let first = true;
	return src
		? (async () => {
				let res: string[] = [];
				for await (let x of src) res.push(String(x));
				return res.join(sep);
			})()
		: reducer<T, string>(
				() => "",
				(acc, x) => (
					(acc = first ? acc + x : acc + sep + x),
					(first = false),
					acc
				)
			);
}
