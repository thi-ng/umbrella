import { isIterable } from "@thi.ng/checks/is-iterable";
import { now, timeDiff } from "@thi.ng/timestamp";
import type { Reducer, Transducer } from "./api.js";
import { compR } from "./compr.js";
import { iterator1 } from "./iterator.js";

/**
 * Stateful transducer. Ignores the actual input values, but
 * produces time measurements since last value processed,
 * e.g. for use in async usage contexts.
 *
 * @example
 * ```ts tangle:../export/benchmark.ts
 * import { fromInterval, trace } from "@thi.ng/rstream";
 * import { benchmark, comp, movingAverage } from "@thi.ng/transducers";
 *
 * fromInterval(16).subscribe(
 *   trace(),
 *   { xform: comp(benchmark(), movingAverage(60)) }
 * );
 * // 16.766666666666666
 * // 17.05
 * // 17.033333333333335
 * // 17.033333333333335
 * // ...
 * ```
 */
export function benchmark(): Transducer<any, number>;
export function benchmark(src: Iterable<any>): IterableIterator<number>;
export function benchmark(src?: Iterable<any>): any {
	return isIterable(src)
		? iterator1(benchmark(), src)
		: (rfn: Reducer<number, any>) => {
				const r = rfn[2];
				let prev = now();
				return compR(rfn, (acc, _) => {
					const t = now();
					const delta = timeDiff(prev, t);
					prev = t;
					return r(acc, delta);
				});
		  };
}
