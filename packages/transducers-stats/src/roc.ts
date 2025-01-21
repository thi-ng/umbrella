// SPDX-License-Identifier: Apache-2.0
import { sliding } from "@thi.ng/buffers/sliding";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import type { Reducer, Transducer } from "@thi.ng/transducers";
import { compR } from "@thi.ng/transducers/compr";
import { iterator1 } from "@thi.ng/transducers/iterator";

/**
 * Rate of change.
 *
 * https://en.wikipedia.org/wiki/Momentum_(technical_analysis)
 *
 * Note: the number of results will be `period` less than the number of
 * processed inputs and no outputs will be produced if there were less than
 * `period` input values.
 *
 * @param period -
 */
export function roc(period: number): Transducer<number, number>;
export function roc(
	period: number,
	src: Iterable<number>
): IterableIterator<number>;
export function roc(period: number, src?: Iterable<number>): any {
	if (src) {
		return iterator1(roc(period), src);
	}
	period |= 0;
	period < 1 && illegalArgs("period must be >= 1");
	return (rfn: Reducer<number, any>) => {
		const reduce = rfn[2];
		const window = sliding<number>(period);
		return compR(rfn, (acc, x: number) => {
			if (window.length === period) {
				const prev = window.read();
				acc = reduce(acc, (x - prev) / prev);
			}
			window.write(x);
			return acc;
		});
	};
}
