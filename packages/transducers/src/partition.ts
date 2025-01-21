// SPDX-License-Identifier: Apache-2.0
import type { Reducer, Transducer } from "./api.js";
import { __iter, iterator } from "./iterator.js";

/**
 * Transducer to create overlapping and non-overlapping sliding windows
 * of inputs. Window size and progress speed can be configured via
 * `size` and `step`. By default only full / complete partitions are
 * emitted. However, if `all` is true, the last partition is allowed to
 * be incomplete / partially filled only.
 *
 * @example
 * ```ts tangle:../export/partition.ts
 * import { partition, range } from "@thi.ng/transducers";
 *
 * console.log(
 *   [...partition(3, range(10))]
 * );
 * // [ [ 0, 1, 2 ], [ 3, 4, 5 ], [ 6, 7, 8 ] ]
 *
 * console.log(
 *   [...partition(3, true, range(10))]
 * );
 * // [ [ 0, 1, 2 ], [ 3, 4, 5 ], [ 6, 7, 8 ], [ 9 ] ]
 *
 * console.log(
 *   [...partition(3, 1, range(10))]
 * );
 * // [ [ 0, 1, 2 ],
 * //   [ 1, 2, 3 ],
 * //   [ 2, 3, 4 ],
 * //   [ 3, 4, 5 ],
 * //   [ 4, 5, 6 ],
 * //   [ 5, 6, 7 ],
 * //   [ 6, 7, 8 ],
 * //   [ 7, 8, 9 ] ]
 * ```
 *
 * @param size -
 */
export function partition<T>(size: number): Transducer<T, T[]>;
export function partition<T>(size: number, all: boolean): Transducer<T, T[]>;
export function partition<T>(size: number, step: number): Transducer<T, T[]>;
export function partition<T>(
	size: number,
	step: number,
	all: boolean
): Transducer<T, T[]>;
export function partition<T>(
	size: number,
	src: Iterable<T>
): IterableIterator<T[]>;
export function partition<T>(
	size: number,
	all: boolean,
	src: Iterable<T>
): IterableIterator<T[]>;
export function partition<T>(
	size: number,
	step: number,
	src: Iterable<T>
): IterableIterator<T[]>;
export function partition<T>(
	size: number,
	step: number,
	all: boolean,
	src: Iterable<T>
): IterableIterator<T[]>;
export function partition<T>(...args: any[]): any {
	const iter = __iter(partition, args, iterator);
	if (iter) {
		return iter;
	}
	let size = args[0],
		all: boolean,
		step: number;
	if (typeof args[1] == "number") {
		step = args[1];
		all = args[2];
	} else {
		step = size;
		all = args[1];
	}
	return ([init, complete, reduce]: Reducer<T[], any>) => {
		let buf: T[] = [];
		let skip = 0;
		return <Reducer<T, any>>[
			init,
			(acc) => {
				if (all && buf.length > 0) {
					acc = reduce(acc, buf);
					buf = [];
				}
				return complete(acc);
			},
			(acc, x) => {
				if (skip <= 0) {
					if (buf.length < size) {
						buf.push(x);
					}
					if (buf.length === size) {
						acc = reduce(acc, buf);
						buf = step < size ? buf.slice(step) : [];
						skip = step - size;
					}
				} else {
					skip--;
				}
				return acc;
			},
		];
	};
}
