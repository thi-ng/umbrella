// SPDX-License-Identifier: Apache-2.0
import { roundTo } from "@thi.ng/math/prec";
import type { Reducer, Transducer } from "./api.js";
import { compR } from "./compr.js";
import { __iter } from "./iterator.js";

/**
 * Config options for {@link binned} transducer
 */
export interface BinnedOpts {
	/**
	 * Rounding precision. Values inside the closed `[min,max]` interval will be
	 * rounded to multiples of given `precision.
	 *
	 * @defaultValue 1
	 */
	prec: number;
	/**
	 * Lower bounds of interval.
	 *
	 * @defaultValue -♾️
	 */
	min: number;
	/**
	 * Upper bounds of interval.
	 *
	 * @defaultValue +♾️
	 */
	max: number;
}

/**
 * Transducer to apply binning and interval clipping for numeric values based on
 * provided options. Values in the closed `[min,max]` interval will be rounded
 * to multiples of given `prec`ision (e.g. as a preparation for
 * {@link frequencies} et al). Values outside the interval will be ignored.
 *
 * @example
 * ```ts tangle:../export/binned.ts
 * import { binned, frequencies, pluck, repeatedly, transduce } from "@thi.ng/transducers";
 * import { normal } from "@thi.ng/random";
 * import { barChartVStr } from "@thi.ng/text-canvas";
 *
 * // compute histogram of 1 million gaussian random samples (aka normal distribution)
 * // use binned values and discard those outside configured interval
 * const hist = transduce(
 *   binned({ prec: 0.1, min: -3, max: 3 }),
 *   frequencies(),
 *   repeatedly(normal(), 1e6)
 * );
 * // Map(61) { -3 => 223, ... 0 => 40212, ... 3 => 245 }
 *
 * // sort by key (position)
 * const sorted = [...hist].sort((a,b) => a[0] - b[0]);
 *
 * // draw as ANSI art diagram
 * console.log(barChartVStr(10, pluck(1, sorted)));
 *
 * //                          ▁▄▇▇█▆▆▄
 * //                        ▂▇█████████▆▂
 * //                      ▁▆█████████████▆▁
 * //                     ▅█████████████████▅
 * //                   ▄█████████████████████▃
 * //                 ▂▇███████████████████████▇▂
 * //               ▁▆███████████████████████████▆▁
 * //             ▂▆███████████████████████████████▇▃
 * //         ▁▂▅█████████████████████████████████████▅▃
 * // ▁▁▂▃▄▅▆▇███████████████████████████████████████████▇▆▅▃▃▂▁▁
 * ```
 *
 * @param opts
 */
export function binned(opts?: Partial<BinnedOpts>): Transducer<number, number>;
export function binned(src: Iterable<number>): IterableIterator<number>;
export function binned(
	opts: Partial<BinnedOpts>,
	src: Iterable<number>
): IterableIterator<number>;
export function binned(...args: any[]): any {
	return (
		__iter(binned, args) ||
		((rfn: Reducer<number, any>) => {
			const r = rfn[2];
			const {
				prec = 1,
				min = -Infinity,
				max = Infinity,
			} = <BinnedOpts>(args[0] || {});
			return compR(rfn, (acc, x: number) =>
				x < min || x > max ? acc : r(acc, roundTo(x, prec))
			);
		})
	);
}
