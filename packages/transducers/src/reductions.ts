// SPDX-License-Identifier: Apache-2.0
import type { Reducer } from "./api.js";
import { reduce } from "./reduce.js";
import { isReduced, reduced } from "./reduced.js";

export function reductions<A, B>(rfn: Reducer<A, B>): Reducer<A, B[]>;
export function reductions<A, B>(rfn: Reducer<A, B>, src: Iterable<A>): B[];
export function reductions<A, B>(rfn: Reducer<A, B>, src?: Iterable<A>): any {
	const [init, complete, _reduce] = rfn;
	return src
		? reduce(reductions(rfn), src)
		: <Reducer<A, B[]>>[
				() => [init()],
				(acc) => (
					(acc[acc.length - 1] = complete(acc[acc.length - 1])), acc
				),
				(acc, x) => {
					const res = _reduce(acc[acc.length - 1], x);
					if (isReduced(res)) {
						acc.push(res.deref());
						return reduced(acc);
					}
					acc.push(res);
					return acc;
				},
		  ];
}
