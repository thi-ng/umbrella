/**
 * Iterator producing an exponential curve (with adjustable curvature) between
 * `start` and `end` values over `num` steps. This is the exponential equivalent
 * of {@link line}.
 *
 * @remarks
 * Since `start` is the first value emitted, the `end` value is only reached in
 * the `num+1`th step.
 *
 * The curvature can be controlled via the logarithmic `rate` param. Recommended
 * range [0.0001 - 10000] (curved -> linear). Default: 0.1
 *
 * Similar functionality (w/ more options) is availble here:
 * [`curve()`](https://docs.thi.ng/umbrella/dsp/functions/curve.html).
 *
 * @example
 * ```ts
 * [...curve(50, 100, 10, 2)]
 * // [
 * //   50,
 * //   73.193,
 * //   85.649,
 * //   92.339,
 * //   95.932,
 * //   97.861,
 * //   98.897,
 * //   99.454,
 * //   99.753,
 * //   99.913,
 * //   100
 * // ]
 * ```
 *
 * @param start -
 * @param end -
 * @param steps -
 * @param falloff -
 */
export function* curve(
	start: number,
	end: number,
	steps = 10,
	rate = 0.1
): IterableIterator<number> {
	const c = Math.exp(
		-Math.log((Math.abs(end - start) + rate) / rate) / steps
	);
	const offset = (start < end ? end + rate : end - rate) * (1 - c);
	steps > 0 && (yield start);
	for (let x = start; steps-- > 0; ) {
		yield (x = offset + x * c);
	}
}
