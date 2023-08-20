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
 * @remarks
 * Reference:
 * https://en.wikipedia.org/wiki/Prefix_sum#Scan_higher_order_function
 *
 * @example
 * ```ts
 * [...iterator(scan(add()), range(10))]
 * // [ 0, 1, 3, 6, 10, 15, 21, 28, 36, 45 ]
 *
 * // directly as iterator and with initial result
 * [...scan(add(), 100, range(10))]
 * // [ 100, 101, 103, 106, 110, 115, 121, 128, 136, 145 ]
 *
 * // as transducer
 * transduce(
 *   // parallel processing lanes for each input
 *   multiplex(
 *     // join strings
 *     scan(str(" ")),
 *     // compute total length (+1)
 *     comp(length(1), scan(add()))
 *   ),
 *   // only keep final value
 *   last(),
 *   // inputs
 *   ["alpha", "beta", "gamma", "delta"]
 * )
 * // [ 'alpha beta gamma delta', 23 ]
 * ```
 *
 * @param rfn - reducer used as scan operator
 * @param init -
 * @param src -
 */
export function scan<A, B>(rfn: Reducer<B, A>, init?: B): Transducer<A, B>;
export function scan<A, B>(
	rfn: Reducer<B, A>,
	init: B,
	src: Iterable<A>
): IterableIterator<B>;
export function scan<A, B>(...args: any[]): any {
	return (
		(args.length > 2 && __iter(scan, args, iterator)) ||
		(([inito, completeo, reduceo]: Reducer<any, B>) => {
			const [initi, completei, reducei]: Reducer<B, A> = args[0];
			let acc: B = args.length > 1 && args[1] != null ? args[1] : initi();
			return <Reducer<B, A>>[
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
