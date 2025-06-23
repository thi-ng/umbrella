// SPDX-License-Identifier: Apache-2.0
import { isIterable } from "@thi.ng/checks/is-iterable";
import type { Reducer, Transducer } from "./api.js";
import { iterator1 } from "./iterator.js";
import { compR } from "./compr.js";
import { ensureArray } from "@thi.ng/arrays/ensure-array";

/**
 * Transducer which accepts iterables as value and joins each into a string
 * using given separator.
 *
 * @example
 * ```ts tangle:../export/join.ts
 * import { join } from "@thi.ng/transducers";
 *
 * console.log([...join("/", [[1, 2, 3], [4, 5]])]);
 * // [ '1/2/3', '4/5' ]
 * ```
 *
 * @param sep
 */
export function join(sep?: string): Transducer<Iterable<any>, string>;
export function join(
	sep: string,
	src?: Iterable<Iterable<any>>
): IterableIterator<string>;
export function join(sep = "", src?: Iterable<any>): any {
	return isIterable(src)
		? iterator1(join(sep), src)
		: (rfn: Reducer<string, any>) => {
				const r = rfn[2];
				return compR(rfn, (acc, x: Iterable<any>) =>
					r(acc, ensureArray(x).join(sep))
				);
		  };
}
