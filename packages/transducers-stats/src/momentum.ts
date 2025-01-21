// SPDX-License-Identifier: Apache-2.0
import { sliding } from "@thi.ng/buffers/sliding";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import type { Reducer, Transducer } from "@thi.ng/transducers";
import { compR } from "@thi.ng/transducers/compr";
import { iterator1 } from "@thi.ng/transducers/iterator";

/**
 * @remarks
 * Reference:
 * https://en.wikipedia.org/wiki/Momentum_(technical_analysis)
 *
 * Note: the number of results will be `period` less than the number
 * of processed inputs.
 *
 * @param period -
 */
export function momentum(period: number): Transducer<number, number>;
export function momentum(
	period: number,
	src: Iterable<number>
): IterableIterator<number>;
export function momentum(period: number, src?: Iterable<number>): any {
	if (src) {
		return iterator1(momentum(period), src);
	}
	period |= 0;
	period < 1 && illegalArgs("period must be >= 1");
	return (rfn: Reducer<number, any>) => {
		const reduce = rfn[2];
		const window = sliding<number>(period);
		return compR(rfn, (acc, x: number) => {
			if (window.length === period) {
				acc = reduce(acc, x - window.read());
			}
			window.write(x);
			return acc;
		});
	};
}
