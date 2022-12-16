import { mixHermite } from "@thi.ng/math/mix";
import type { Transducer } from "./api.js";
import { interpolate } from "./interpolate.js";

/**
 * Pre-configured version of {@link interpolate} for numeric values and using
 * cubic hermite interpolation.
 *
 * @remarks
 * The number of samples per interval is configurable. No values will be
 * produced if there're less than 4 inputs.
 *
 * Note: Due to the nature of hermite interpolation, the very first and last
 * input are only used to compute the curve tangents, but will not appear in the
 * output. Use the {@link extendSides} iterator to transform the input so that
 * these values are duplicated and so are used as part of an interpolation
 * interval.
 *
 * See also:
 * - {@link interpolate}
 * - {@link interpolateLinear}
 * - {@link extendSides}
 *
 * @param n -
 */
export function interpolateHermite(n: number): Transducer<number, number>;
export function interpolateHermite(
	n: number,
	src: Iterable<number>
): IterableIterator<number>;
export function interpolateHermite(n: number, src?: Iterable<number>): any {
	return interpolate<number>(
		(chunk, t) => (<any>mixHermite)(...chunk, t),
		4,
		n,
		src!
	);
}
