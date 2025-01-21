// SPDX-License-Identifier: Apache-2.0
import type { Fn } from "@thi.ng/api";
import type { Reducer, Transducer } from "./api.js";
import { compR } from "./compr.js";
import { __iter } from "./iterator.js";

/**
 * Transducer. Similar to {@link map}, but only transforms every `n`-th input
 * value and passes intermediate values unchanged downstream.
 *
 * @remarks
 * The optional `offset` arg can be used to adjust the number of inputs before
 * the first transformation occurs (default 0).
 *
 * @example
 * ```ts tangle:../export/map-nth.ts
 * import { mapNth, range } from "@thi.ng/transducers";
 *
 * console.log(
 *   [...mapNth(3, (x) => `*${x}*`, range(1, 10))]
 * );
 * // [ "*1*", 2, 3, "*4*", 5, 6, "*7*", 8, 9 ]
 *
 * // with offset
 * console.log(
 *   [...mapNth(3, 5, (x) => x * 100, range(1, 10))]
 * );
 * // [ 1, 2, 3, 4, 5, 600, 7, 8, 900 ]
 * ```
 *
 * @param n - step size
 * @param fn - transformation function
 */
export function mapNth<A, B>(n: number, fn: Fn<A, B>): Transducer<A, A | B>;
export function mapNth<A, B>(
	n: number,
	offset: number,
	fn: Fn<A, B>
): Transducer<A, A | B>;
export function mapNth<A, B>(
	n: number,
	fn: Fn<A, B>,
	src: Iterable<A>
): IterableIterator<A | B>;
export function mapNth<A, B>(
	n: number,
	offset: number,
	fn: Fn<A, B>,
	src: Iterable<A>
): IterableIterator<A | B>;
export function mapNth<A, B>(...args: any[]): any {
	const iter = __iter(mapNth, args);
	if (iter) {
		return iter;
	}
	let n = args[0] - 1;
	let offset: number;
	let fn: Fn<A, B>;
	if (typeof args[1] === "number") {
		offset = args[1];
		fn = args[2];
	} else {
		fn = args[1];
		offset = 0;
	}
	return (rfn: Reducer<A | B, any>) => {
		const r = rfn[2];
		let skip = 0,
			off = offset;
		return compR(rfn, (acc, x: A) => {
			if (off === 0) {
				if (skip === 0) {
					skip = n;
					return r(acc, fn(x));
				}
				skip--;
			} else {
				off--;
			}
			return r(acc, x);
		});
	};
}
