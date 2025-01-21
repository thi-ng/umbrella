// SPDX-License-Identifier: Apache-2.0
import type { Reducer, Transducer } from "@thi.ng/transducers";
import { compR } from "@thi.ng/transducers/compr";
import { iterator1 } from "@thi.ng/transducers/iterator";
import { Deque } from "./deque.js";

export function movingMinimum(period: number): Transducer<number, number>;
export function movingMinimum(
	period: number,
	src: Iterable<number>
): IterableIterator<number>;
export function movingMinimum(period: number, src?: Iterable<number>): any {
	return src
		? iterator1(movingMinimum(period), src)
		: (rfn: Reducer<number, any>) => {
				const samples: number[] = [];
				const deque = new Deque(samples, (a, b) => a >= b);
				return compR(rfn, (acc: any, x: number) => {
					const num = samples.push(x);
					deque.add(x);
					if (num > period) {
						samples.shift();
						deque.shift();
					}
					return num >= period ? rfn[2](acc, deque.head()) : acc;
				});
		  };
}
