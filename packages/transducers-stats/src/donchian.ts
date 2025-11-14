// SPDX-License-Identifier: Apache-2.0
import type { Reducer, Transducer } from "@thi.ng/transducers";
import { compR } from "@thi.ng/transducers/compr";
import { iterator1 } from "@thi.ng/transducers/iterator";
import { Deque } from "./deque.js";

/**
 * Computes Donchian channel, i.e. min/max values for sliding window.
 *
 * https://en.wikipedia.org/wiki/Donchian_channel
 *
 * Note: the number of results will be `period-1` less than the number of
 * processed inputs.
 *
 * @param period -
 */
export function donchian(period: number): Transducer<number, [number, number]>;
export function donchian(
	period: number,
	src: Iterable<number>
): IterableIterator<[number, number]>;
export function donchian(period: number, src?: Iterable<number>): any {
	return src
		? iterator1(donchian(period), src)
		: (rfn: Reducer<[number, number], any>) => {
				const samples: number[] = [];
				const minDeque = new Deque(samples, (a, b) => a >= b);
				const maxDeque = new Deque(samples, (a, b) => a <= b);
				return compR(rfn, (acc: any, x: number) => {
					const num = samples.push(x);
					minDeque.add(x);
					maxDeque.add(x);
					if (num > period) {
						samples.shift();
						minDeque.shift();
						maxDeque.shift();
					}
					return num >= period
						? rfn[2](acc, [minDeque.head(), maxDeque.head()])
						: acc;
				});
		  };
}
