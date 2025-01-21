// SPDX-License-Identifier: Apache-2.0
import type { Reducer } from "./api.js";
import { reducer } from "./reduce.js";

/**
 * Reducer which concatenates inputs into a string, each value separated by
 * `sep` (default: "").
 *
 * @param sep
 */
export function str(sep?: string): Reducer<any, string>;
export function str(sep: string, src: Iterable<any>): string;
export function str(sep?: string, src?: Iterable<any>): any {
	sep = sep || "";
	let first = true;
	return src
		? [...src].join(sep)
		: reducer<any, string>(
				() => "",
				(acc, x) => (
					(acc = first ? acc + x : acc + sep + x),
					(first = false),
					acc
				)
		  );
}
