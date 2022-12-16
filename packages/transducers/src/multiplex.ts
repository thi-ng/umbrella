import { juxt } from "@thi.ng/compose/juxt";
import type { Transducer, TxLike } from "./api.js";
import { map } from "./map.js";
import { step } from "./step.js";

/**
 * Yields a new transducer which applies given transducers in parallel (using
 * [`juxt()`](https://docs.thi.ng/umbrella/compose/functions/juxt.html) &
 * {@link step}) and produces tuples of results.
 *
 * @remarks
 * Use the {@link noop} transducer for processing lanes which should retain the
 * original input values.
 *
 * @example
 * ```ts
 * [...iterator(
 *   multiplex(
 *     map(x => x.charAt(0)),
 *     map(x => x.toUpperCase()),
 *     map(x => x.length)
 *   ),
 *   ["Alice", "Bob", "Charlie", "Andy"]
 * )]
 * // [ [ "A", "ALICE", 5 ], [ "B", "BOB", 3 ], [ "C", "CHARLIE", 7 ] ]
 * ```
 *
 * @param a -
 */
export function multiplex<T, A>(a: TxLike<T, A>): Transducer<T, [A]>;
export function multiplex<T, A, B>(
	a: TxLike<T, A>,
	b: TxLike<T, B>
): Transducer<T, [A, B]>;
export function multiplex<T, A, B, C>(
	a: TxLike<T, A>,
	b: TxLike<T, B>,
	c: TxLike<T, C>
): Transducer<T, [A, B, C]>;
export function multiplex<T, A, B, C, D>(
	a: TxLike<T, A>,
	b: TxLike<T, B>,
	c: TxLike<T, C>,
	d: TxLike<T, D>
): Transducer<T, [A, B, C, D]>;
export function multiplex<T, A, B, C, D, E>(
	a: TxLike<T, A>,
	b: TxLike<T, B>,
	c: TxLike<T, C>,
	d: TxLike<T, D>,
	e: TxLike<T, E>
): Transducer<T, [A, B, C, D, E]>;
export function multiplex<T, A, B, C, D, E, F>(
	a: TxLike<T, A>,
	b: TxLike<T, B>,
	c: TxLike<T, C>,
	d: TxLike<T, D>,
	e: TxLike<T, E>,
	f: TxLike<T, F>
): Transducer<T, [A, B, C, D, E, F]>;
export function multiplex<T, A, B, C, D, E, F, G>(
	a: TxLike<T, A>,
	b: TxLike<T, B>,
	c: TxLike<T, C>,
	d: TxLike<T, D>,
	e: TxLike<T, E>,
	f: TxLike<T, F>,
	g: TxLike<T, G>
): Transducer<T, [A, B, C, D, E, F, G]>;
export function multiplex<T, A, B, C, D, E, F, G, H>(
	a: TxLike<T, A>,
	b: TxLike<T, B>,
	c: TxLike<T, C>,
	d: TxLike<T, D>,
	e: TxLike<T, E>,
	f: TxLike<T, F>,
	g: TxLike<T, G>,
	h: TxLike<T, H>
): Transducer<T, [A, B, C, D, E, F, G, H]>;
export function multiplex(...args: any[]) {
	return map(juxt.apply(null, <any>args.map(step)));
}
