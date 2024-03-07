import type { Transducer } from "@thi.ng/transducers";
import { comp } from "@thi.ng/transducers/comp";
import { drop } from "@thi.ng/transducers/drop";
import { __iter } from "@thi.ng/transducers/iterator";
import { map } from "@thi.ng/transducers/map";
import { multiplex } from "@thi.ng/transducers/multiplex";
import { partition } from "@thi.ng/transducers/partition";
import { mse } from "./mse.js";
import { sma } from "./sma.js";

export interface BollingerBand {
	min: number;
	max: number;
	mean: number;
	pb: number;
}

/**
 * Computes Bollinger bands using sliding window.
 *
 * https://en.wikipedia.org/wiki/Bollinger_Bands
 *
 * Note: the number of results will be `period-1` less than the
 * number of processed inputs.
 *
 * @param period -
 * @param sd -
 */
export function bollinger(
	period?: number,
	sd?: number
): Transducer<number, BollingerBand>;
export function bollinger(
	src: Iterable<number>
): IterableIterator<BollingerBand>;
export function bollinger(
	period: number,
	src: Iterable<number>
): IterableIterator<BollingerBand>;
export function bollinger(
	period: number,
	sd: number,
	src: Iterable<number>
): IterableIterator<BollingerBand>;
export function bollinger(...args: any[]): any {
	const iter = __iter(bollinger, args);
	if (iter) {
		return iter;
	}
	const period: number = args[0] || 20;
	const sd: number = args[1] || 2;
	return comp(
		multiplex(partition(period, 1), sma(period)),
		drop(period - 1),
		map(([window, mean]: [number[], number]) => {
			const std = Math.sqrt(mse(window, mean) / period) * sd;
			const min = mean - std;
			const max = mean + std;
			const pb = (window[period - 1] - min) / (max - min);
			return { min, max, mean, pb };
		})
	);
}
