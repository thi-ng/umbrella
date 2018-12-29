import { normRange } from "./norm-range";
import { repeat } from "./repeat";

/**
 * Takes a number of keyframe tuples (`stops`) and yields a sequence of
 * `n+1` equally spaced, interpolated values. Keyframes are defined as
 * `[pos, value]`. Only values in the closed `minPos` .. `maxPos`
 * interval will be computed.
 *
 * Interpolation happens in two stages: First the given `init` function
 * is called to transform/prepare pairs of consecutive keyframes into a
 * single interval (user defined). Then to produce each interpolated
 * value calls `mix` with the currently active interval and
 * interpolation time value `t` (re-normalized and relative to current
 * interval). The iterator yields results of these `mix()` function
 * calls.
 *
 * Depending on the overall number of samples requested and the distance
 * between keyframes, some keyframes MIGHT be skipped. E.g. if
 * requesting 10 samples within [0,1], the interval between two
 * successive keyframes at 0.12 and 0.19 would be skipped entirely,
 * since samples will only be taken at multiples of `1/n` (0.0, 0.1,
 * 0.2... in this example).
 *
 * The given keyframe positions can lie outside the `minPos`/`maxPos`
 * range and also don't need to cover the range fully. In the latter
 * case, interpolated values before the first or after the last keyframe
 * will yield the value of the 1st/last keyframe. If only a single
 * keyframe is given in total, all `n` yielded samples will be that
 * keyframe's transformed value.
 *
 * ```
 * [...interpolate(
 *   10,
 *   0,
 *   100,
 *   (a, b) => [a, b],
 *   ([a, b], t) => Math.floor(a + (b - a) * t),
 *   [20, 100],
 *   [50, 200],
 *   [80, 0]
 * )]
 * // [ 100, 100, 100, 133, 166, 200, 133, 66, 0, 0, 0 ]
 * ```
 *
 * Using easing functions (e.g. from thi.ng/math), non-linear
 * interpolation within each keyframe interval can be achieved:
 *
 * ```
 * import { mix, smoothStep } from "@thi.ng/math"
 *
 * [...interpolate(
 *   10,
 *   0,
 *   100,
 *   (a, b) => [a, b],
 *   ([a, b], t) => Math.floor(mix(a, b, smoothStep(0.1, 0.9, t))),
 *   [20, 100],
 *   [50, 200],
 *   [80, 0]
 * )]
 * // [ 100, 100, 100, 120, 179, 200, 158, 41, 0, 0, 0 ]
 * ```
 *
 * @param n
 * @param minPos
 * @param maxPos
 * @param init interval producer (from 2 keyframe values)
 * @param mix interval interpolator
 * @param stops keyframe / stops
 */
export function* interpolate<A, B, C>(
    n: number,
    minPos: number,
    maxPos: number,
    init: (a: A, b: A) => B,
    mix: (interval: B, t: number) => C,
    ...stops: [number, A][]
): IterableIterator<C> {
    let l = stops.length;
    if (l < 1) return;
    if (l === 1) {
        yield* repeat(mix(init(stops[0][1], stops[0][1]), 0), n);
    }
    stops.sort((a, b) => a[0] - b[0]);
    if (stops[l - 1][0] < maxPos) {
        stops.push([maxPos, stops[l - 1][1]]);
    }
    if (stops[0][0] > minPos) {
        stops.unshift([minPos, stops[0][1]]);
    }
    const range = maxPos - minPos;
    let start = stops[0][0];
    let end = stops[1][0];
    let delta = end - start;
    let interval = init(stops[0][1], stops[1][1]);
    let i = 1;
    l = stops.length;
    for (let t of normRange(n)) {
        t = minPos + range * t;
        if (t > end) {
            while (i < l && t > stops[i][0]) i++;
            start = stops[i - 1][0];
            end = stops[i][0];
            delta = end - start;
            interval = init(stops[i - 1][1], stops[i][1]);
        }
        yield mix(interval, delta !== 0 ? (t - start) / delta : 0);
    }
}
