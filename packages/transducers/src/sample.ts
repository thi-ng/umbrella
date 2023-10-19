import type { IRandom } from "@thi.ng/random";
import { SYSTEM } from "@thi.ng/random/system";
import type { Reducer, Transducer } from "./api.js";
import { compR } from "./compr.js";
import { __iter } from "./iterator.js";

/**
 * Transducer which only yields values with given `prob` probability
 * (0.0 .. 1.0 range). Supports custom PRNGs via
 * [`IRandom`](https://docs.thi.ng/umbrella/random/interfaces/IRandom.html) interface.
 *
 * @example
 * ```ts
 * // 10% probability
 * [...sample(0.1, range(100))]
 * // [ 3, 24, 25, 36, 43, 49, 59, 64, 82, 86, 89 ]
 * ```
 *
 * @param prob -
 * @param src -
 */
export function sample<T>(prob: number): Transducer<T, T>;
export function sample<T>(prob: number, rnd: IRandom): Transducer<T, T>;
export function sample<T>(prob: number, src: Iterable<T>): IterableIterator<T>;
export function sample<T>(
	prob: number,
	rnd: IRandom,
	src: Iterable<T>
): IterableIterator<T>;
export function sample<T>(...args: any[]): any {
	const iter = __iter(sample, args);
	if (iter) {
		return iter;
	}
	const prob = args[0];
	const rnd: IRandom = args[1] || SYSTEM;
	return (rfn: Reducer<any, T>) => {
		const r = rfn[2];
		return compR(rfn, (acc, x: T) =>
			rnd.probability(prob) ? r(acc, x) : acc
		);
	};
}
