import type { Reducer, Transducer } from "@thi.ng/transducers";
import { compR } from "@thi.ng/transducers/compr";
import { __iter } from "@thi.ng/transducers/iterator";
import { step } from "@thi.ng/transducers/step";
import { donchian } from "./donchian.js";
import { sma } from "./sma.js";

export interface Stochastic {
	k: number;
	d1: number;
	d2: number;
}

/**
 * Stochastic oscillator. Yields tuples of `[%K, %D1, %D2]`, where:
 *
 * - %K = (curr - L5) / (H5 - L5)
 * - %D1 = SMA(%K, periodD1)
 * - %D2 = SMA(%D1, periodD2)
 *
 * https://en.wikipedia.org/wiki/Stochastic_oscillator
 *
 * @param periodK -
 * @param periodD1 -
 * @param periodD2 -
 */
export function stochastic(
	periodK?: number,
	periodD1?: number,
	periodD2?: number
): Transducer<number, Stochastic>;
export function stochastic(src: Iterable<number>): IterableIterator<Stochastic>;
export function stochastic(
	periodK: number,
	periodD1: number,
	periodD2: number,
	src: Iterable<number>
): IterableIterator<Stochastic>;
export function stochastic(...args: any[]): any {
	return (
		__iter(stochastic, args) ||
		((rfn: Reducer<any, Stochastic>) => {
			const reduce = rfn[2];
			const xfD = step(donchian(args[0] || 5));
			const ma1 = step(sma(args[1] || 3));
			const ma2 = step(sma(args[2] || 3));
			return compR(rfn, (acc, x: number) => {
				const b = <number[]>xfD(x);
				if (b == null) return acc;
				const k = (x - b[0]) / (b[1] - b[0]);
				const d1 = <number>ma1(k);
				if (d1 == null) return acc;
				const d2 = <number>ma2(d1);
				if (d2 == null) return acc;
				return reduce(acc, { k, d1, d2 });
			});
		})
	);
}
