import type { Transducer } from "@thi.ng/transducers";
import { comp } from "@thi.ng/transducers/comp";
import { drop } from "@thi.ng/transducers/drop";
import { __iter } from "@thi.ng/transducers/iterator";
import { map } from "@thi.ng/transducers/map";
import { multiplex } from "@thi.ng/transducers/multiplex";
import { partition } from "@thi.ng/transducers/partition";
import { mse } from "./mse.js";
import { sma } from "./sma.js";

/**
 * Moving standard deviation, calculates mean square error to SMA and yields
 * sequence of `sqrt(error / period)`.
 *
 * https://en.wikipedia.org/wiki/Bollinger_Bands
 *
 * Note: the number of results will be `period-1` less than the number of
 * processed inputs.
 *
 * @param period -
 * @param scale -
 */
export function sd(period?: number, scale?: number): Transducer<number, number>;
export function sd(src: Iterable<number>): IterableIterator<number>;
export function sd(
	period: number,
	scale: number,
	src: Iterable<number>
): IterableIterator<number>;
export function sd(...args: any[]): any {
	const iter = __iter(sd, args);
	if (iter) {
		return iter;
	}
	const period: number = args[0] || 20;
	const scale: number = args[1] || 1;
	return comp(
		multiplex(partition(period, 1), sma(period)),
		drop(period - 1),
		map(
			([window, mean]: [number[], number]) =>
				Math.sqrt(mse(window, mean) / period) * scale
		)
	);
}
