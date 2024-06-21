import type { Reducer, Transducer } from "./api.js";
import { __iter, iterator } from "./iterator.js";
import { ensureReduced, isReduced, unreduced } from "./reduced.js";

/**
 * Transducer which performs "scan" operation via given reducer.
 *
 * @remarks
 * If an input `src` is given an initial result `init` must be provided
 * too as arg. Use `null` or `undefined` to use the given reducer's
 * default.
 *
 * Reference:
 * https://en.wikipedia.org/wiki/Prefix_sum#Scan_higher_order_function
 *
 * @example
 * ```ts tangle:../export/scan.ts
 * import * as tx from "@thi.ng/transducers";
 *
 * console.log(
 *   [...tx.iterator(tx.scan(tx.add()), tx.range(10))]
 * );
 * // [ 0, 1, 3, 6, 10, 15, 21, 28, 36, 45 ]
 *
 * // directly as iterator and with initial result
 * console.log(
 *   [...tx.scan(tx.add(), 100, tx.range(10))]
 * );
 * // [ 100, 101, 103, 106, 110, 115, 121, 128, 136, 145 ]
 *
 * // as transducer
 * const res = tx.transduce(
 *   // parallel processing lanes for each input
 *   tx.multiplex(
 *     // first lane: join strings
 *     tx.scan(tx.str(" ")),
 *     // second lane: compute total length (+1)
 *     tx.comp(tx.length(1), tx.scan(tx.add()))
 *   ),
 *   // use last() reducer to only keep final value
 *   tx.last(),
 *   // inputs
 *   ["alpha", "beta", "gamma", "delta"]
 * );
 *
 * console.log(res);
 * // [ 'alpha beta gamma delta', 123 ]
 * ```
 *
 * @param rfn - reducer used as scan operator
 * @param init -
 */
export function scan<A, B>(rfn: Reducer<A, B>, init?: B): Transducer<A, B>;
export function scan<A, B>(
	rfn: Reducer<A, B>,
	init: B,
	src: Iterable<A>
): IterableIterator<B>;
export function scan<A, B>(...args: any[]): any {
	return (
		(args.length > 2 && __iter(scan, args, iterator)) ||
		(([inito, completeo, reduceo]: Reducer<B, any>) => {
			const [initi, completei, reducei]: Reducer<A, B> = args[0];
			let acc: B = args.length > 1 && args[1] != null ? args[1] : initi();
			return <Reducer<A, B>>[
				inito,
				(_acc) => {
					let a = completei(acc);
					if (a !== acc) {
						_acc = unreduced(reduceo(_acc, a));
					}
					acc = a;
					return completeo(_acc);
				},
				(_acc, x: A) => {
					acc = <any>reducei(acc, x);
					if (isReduced(acc)) {
						return ensureReduced(reduceo(_acc, (<any>acc).deref()));
					}
					return reduceo(_acc, acc);
				},
			];
		})
	);
}
