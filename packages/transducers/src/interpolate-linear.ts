import { mix } from "@thi.ng/math/mix";
import type { Transducer } from "./api.js";
import { interpolate } from "./interpolate.js";

/**
 * Pre-configured version of {@link interpolate} for numeric values and using
 * pairwise linear interpolation.
 *
 * @remarks
 * The number of samples per interval is configurable. No values will be
 * produced if there're less than 2 inputs.
 *
 * See also:
 * - {@link interpolate}
 * - {@link interpolateHermite}
 *
 * @param n -
 */
export function interpolateLinear(n: number): Transducer<number, number>;
export function interpolateLinear(
	n: number,
	src: Iterable<number>
): IterableIterator<number>;
export function interpolateLinear(n: number, src?: Iterable<number>): any {
	return interpolate<number>(
		(chunk, t) => (<any>mix)(...chunk, t),
		2,
		n,
		src!
	);
}
