import type { Fn } from "@thi.ng/api";
import { SEMAPHORE } from "@thi.ng/api/api";
import type { Reducer, Transducer } from "./api.js";
import { __iter, iterator } from "./iterator.js";
import { isReduced } from "./reduced.js";

/**
 * Transducer. Applies given `fn` to each incoming value and collects
 * values until the return value of the `fn` has changed. Once this
 * happens yields chunk of buffered values.
 *
 * @example
 * ```ts
 * [...partitionBy((x) => x & 1, [1, 2, 4, 6, 3, 5, 8, 4])]
 * // [ [ 1 ], [ 2, 4, 6 ], [ 3, 5 ], [ 8, 4 ] ]
 * ```
 *
 * @param fn -
 * @param stateful -
 */
export function partitionBy<T>(
	fn: Fn<T, any> | (() => Fn<T, any>),
	stateful?: boolean
): Transducer<T, T[]>;
export function partitionBy<T>(
	fn: Fn<T, any> | (() => Fn<T, any>),
	src: Iterable<T>
): IterableIterator<T[]>;
export function partitionBy<T>(
	fn: Fn<T, any> | (() => Fn<T, any>),
	stateful: boolean,
	src: Iterable<T>
): IterableIterator<T[]>;
export function partitionBy<T>(...args: any[]): any {
	return (
		__iter(partitionBy, args, iterator) ||
		(([init, complete, reduce]: Reducer<any, T[]>) => {
			const fn: Fn<T, any> | (() => Fn<T, any>) = args[0];
			const f = args[1] === true ? (<() => Fn<T, any>>fn)() : fn;
			let prev: any = SEMAPHORE;
			let chunk: T[] | null;
			return <Reducer<any, T>>[
				init,
				(acc) => {
					if (chunk && chunk.length) {
						acc = reduce(acc, chunk);
						chunk = null;
					}
					return complete(acc);
				},
				(acc, x) => {
					const curr = f(x);
					if (prev === SEMAPHORE) {
						prev = curr;
						chunk = [x];
					} else if (curr === prev) {
						chunk!.push(x);
					} else {
						chunk && (acc = reduce(acc, chunk));
						chunk = isReduced(acc) ? null : [x];
						prev = curr;
					}
					return acc;
				},
			];
		})
	);
}
