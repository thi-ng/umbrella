import type { Fn2, FnN } from "@thi.ng/api";
import { normRange } from "./norm-range.js";
import { repeat } from "./repeat.js";

export interface TweenOpts<A, B, C> {
	/**
	 * Total number (n+1) of tweened values to produce
	 */
	num: number;
	/**
	 * Min time boundary. Only values in the closed `[min..max]`
	 * time interval will be computed.
	 */
	min: number;
	/**
	 * Max time boundary. Only values in the closed `[min..max]`
	 * time interval will be computed.
	 */
	max: number;
	/**
	 * Interval producer (from 2 keyframe values, i.e. `stops`)
	 */
	init: Fn2<A, A, B>;
	/**
	 * Interval interpolator
	 */
	mix: Fn2<B, number, C>;
	/**
	 * Optional easing function to transform the interval relative `time` param
	 * for `mix`.
	 */
	easing?: FnN;
	/**
	 * Keyframe definitions, i.e. `[time, value]` tuples
	 */
	stops: [number, A][];
}

/**
 * Keyframe based interpolator. Yields a sequence of `num+1` equally
 * spaced, tweened values from given keyframe tuples (`stops`).
 * Keyframes are defined as `[time, value]` tuples. Only values in the
 * closed `[min..max]` time interval will be computed.
 *
 * @remarks
 * Interpolation happens in two stages: First the given `init` function
 * is called to transform/prepare pairs of consecutive keyframes into a
 * single interval (user defined). Then, to produce each tweened value
 * calls `mix` with the currently active interval and interpolation time
 * value `t` (re-normalized and relative to current interval). The
 * iterator yields results of these `mix()` function calls.
 *
 * Depending on the overall `num`ber of samples requested and the
 * distance between keyframes, some keyframes MIGHT be skipped. E.g. if
 * requesting 10 samples within [0,1], the interval between two
 * successive keyframes at 0.12 and 0.19 would be skipped entirely,
 * since samples will only be taken at multiples of `1/num` (i.e. 0.0,
 * 0.1, 0.2... in this example).
 *
 * The given keyframe times can lie outside the `min`/`max` range and
 * also don't need to cover the range fully. In the latter case, tweened
 * values before the first or after the last keyframe will yield the
 * value of the first/last keyframe. If only a single keyframe is given
 * in total, all `num` yielded samples will be that keyframe's
 * transformed value.
 *
 * @example
 * ```ts
 * [...tween({
 *   num: 10,
 *   min: 0,
 *   max: 100,
 *   init: (a, b) => [a, b],
 *   mix: ([a, b], t) => Math.floor(a + (b - a) * t),
 *   stops: [[20, 100], [50, 200], [80, 0]]
 * })]
 * // [ 100, 100, 100, 133, 166, 200, 133, 66, 0, 0, 0 ]
 * ```
 *
 * Using easing functions (e.g. via {@link @thi.ng/math# | @thi.ng/math}),
 * non-linear interpolation within each keyframe interval can be achieved:
 *
 * @example
 * ```ts
 * import { mix, smoothStep } from "@thi.ng/math"
 *
 * [...tween({
 *   num: 10,
 *   min: 0,
 *   max: 100,
 *   init: (a, b) => [a, b],
 *   mix: ([a, b], t) => Math.floor(mix(a, b, smoothStep(0.1, 0.9, t))),
 *   stops: [[20, 100], [50, 200], [80, 0]]
 * })]
 * // [ 100, 100, 100, 120, 179, 200, 158, 41, 0, 0, 0 ]
 * ```
 *
 * - {@link TweenOpts}
 * - {@link (interpolate:1)}
 * - {@link (interpolateHermite:1)}
 * - {@link (interpolateLinear:1)}
 *
 * @param opts -
 */
export function* tween<A, B, C>(opts: TweenOpts<A, B, C>): IterableIterator<C> {
	const { min, max, num, init, mix, stops } = opts;
	const easing = opts.easing || ((x: number) => x);
	let l = stops.length;
	if (l < 1) return;
	if (l === 1) {
		yield* repeat(mix(init(stops[0][1], stops[0][1]), 0), num);
	}
	stops.sort((a, b) => a[0] - b[0]);
	stops[l - 1][0] < max && stops.push([max, stops[l - 1][1]]);
	stops[0][0] > min && stops.unshift([min, stops[0][1]]);
	const range = max - min;
	let start = stops[0][0];
	let end = stops[1][0];
	let delta = end - start;
	let interval = init(stops[0][1], stops[1][1]);
	let i = 1;
	l = stops.length;
	for (let t of normRange(num)) {
		t = min + range * t;
		if (t > end) {
			while (i < l && t > stops[i][0]) i++;
			start = stops[i - 1][0];
			end = stops[i][0];
			delta = end - start;
			interval = init(stops[i - 1][1], stops[i][1]);
		}
		yield mix(interval, easing(delta !== 0 ? (t - start) / delta : 0));
	}
}
