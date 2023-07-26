import { juxt } from "@thi.ng/compose/juxt";
import type { MultiplexTxLike, Transducer } from "./api.js";
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
 * **Important note for transducers which are producing multiple (possibly
 * varying number of) outputs for each received input:** If only a single output
 * is produced per step, the default behavior of {@link step} is to unwrap it,
 * i.e. `[42]` => `42`. To override this behavior, individual transducers given
 * to `multiplex()` can be given as tuple `[xform, false]` (see 2nd example below).
 *
 * @example
 * ```ts
 * [...iterator(
 *   multiplex(
 *     map(x => x.charAt(0)),
 *     map(x => x.toUpperCase()),
 *     map(x => x.length)
 *   ),
 *   ["Alice", "Bob", "Charlie"]
 * )]
 *
 * // [ [ "A", "ALICE", 5 ], [ "B", "BOB", 3 ], [ "C", "CHARLIE", 7 ] ]
 * ```
 *
 * @example
 * ```ts
 * [...iterator(
 *   multiplex(
 *     // override default unwrap behavior for this transducer
 *     // (i.e. here to ensure results are always arrays)
 *     [mapcat((x) => x), false],
 *     // use default behavior for this
 *     map((x) => x),
 *   ),
 *   [[1, 2], [3]]
 * )]
 *
 * // [ [ [ 1, 2 ], [ 1, 2 ] ], [ [ 3 ], [ 3 ] ] ]
 *
 * // to compare: using the default behavior would produce this instead
 * // (note the difference in the last result):
 *
 * // [ [ [ 1, 2 ], [ 1, 2 ] ], [ 3, [ 3 ] ] ]
 * ```
 *
 * @param a -
 */
export function multiplex<T, A>(a: MultiplexTxLike<T, A>): Transducer<T, [A]>;
export function multiplex<T, A, B>(
	a: MultiplexTxLike<T, A>,
	b: MultiplexTxLike<T, B>
): Transducer<T, [A, B]>;
export function multiplex<T, A, B, C>(
	a: MultiplexTxLike<T, A>,
	b: MultiplexTxLike<T, B>,
	c: MultiplexTxLike<T, C>
): Transducer<T, [A, B, C]>;
export function multiplex<T, A, B, C, D>(
	a: MultiplexTxLike<T, A>,
	b: MultiplexTxLike<T, B>,
	c: MultiplexTxLike<T, C>,
	d: MultiplexTxLike<T, D>
): Transducer<T, [A, B, C, D]>;
export function multiplex<T, A, B, C, D, E>(
	a: MultiplexTxLike<T, A>,
	b: MultiplexTxLike<T, B>,
	c: MultiplexTxLike<T, C>,
	d: MultiplexTxLike<T, D>,
	e: MultiplexTxLike<T, E>
): Transducer<T, [A, B, C, D, E]>;
export function multiplex<T, A, B, C, D, E, F>(
	a: MultiplexTxLike<T, A>,
	b: MultiplexTxLike<T, B>,
	c: MultiplexTxLike<T, C>,
	d: MultiplexTxLike<T, D>,
	e: MultiplexTxLike<T, E>,
	f: MultiplexTxLike<T, F>
): Transducer<T, [A, B, C, D, E, F]>;
export function multiplex<T, A, B, C, D, E, F, G>(
	a: MultiplexTxLike<T, A>,
	b: MultiplexTxLike<T, B>,
	c: MultiplexTxLike<T, C>,
	d: MultiplexTxLike<T, D>,
	e: MultiplexTxLike<T, E>,
	f: MultiplexTxLike<T, F>,
	g: MultiplexTxLike<T, G>
): Transducer<T, [A, B, C, D, E, F, G]>;
export function multiplex<T, A, B, C, D, E, F, G, H>(
	a: MultiplexTxLike<T, A>,
	b: MultiplexTxLike<T, B>,
	c: MultiplexTxLike<T, C>,
	d: MultiplexTxLike<T, D>,
	e: MultiplexTxLike<T, E>,
	f: MultiplexTxLike<T, F>,
	g: MultiplexTxLike<T, G>,
	h: MultiplexTxLike<T, H>
): Transducer<T, [A, B, C, D, E, F, G, H]>;
export function multiplex(...args: any[]) {
	return map(
		juxt.apply(
			null,
			<any>(
				args.map((xf) =>
					Array.isArray(xf) ? step(xf[0], xf[1]) : step(xf)
				)
			)
		)
	);
}
