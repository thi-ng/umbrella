import { repeat } from "./repeat";
import { normRange } from "./norm-range";

/**
 * Takes a number of keyframe tuples (`stops`) and yields a sequence of
 * `n` equally spaced, interpolated values. Keyframes are defined as
 * `[pos, value]`, where `pos` must be a normalized value in [0,1]
 * interval.
 *
 * Interpolation happens in two stages: First the given `init` function
 * is called for each new key frame pair to produce a single interval
 * type. Then for each result value calls `mix` with the current
 * interval and interpolation time value `t` (normalized). The iterator
 * yields results of these `mix()` function calls.
 *
 * The given keyframe positions don't need to cover the full [0,1] range
 * and interpolated values before the 1st or last keyframe will yield
 * the value of the 1st/last keyframe.
 *
 * ```
 * [...interpolate(
 *   10,
 *   (a, b) => [a,b],
 *   ([a, b], t) => Math.floor(a + (b - a) * t),
 *   [0.2, 100],
 *   [0.5, 200],
 *   [0.8, 0]
 * )]
 * // [ 100, 100, 100, 133, 166, 200, 133, 66, 0, 0, 0 ]
 * ```
 *
 * @param n
 * @param init
 * @param mix
 * @param stops
 */
export function* interpolate<A, B, C>(
    n: number,
    init: (a: A, b: A) => B,
    mix: (interval: B, t: number) => C,
    ...stops: [number, A][]
): IterableIterator<C> {
    let l = stops.length;
    if (l < 1) return;
    if (l === 1) {
        yield* repeat(mix(init(stops[0][1], stops[0][1]), 0), n);
    }
    if (stops[l - 1][0] < 1) {
        stops.push([1, stops[l - 1][1]]);
    }
    if (stops[0][0] > 0) {
        stops.unshift([0, stops[0][1]]);
    }
    let start = stops[0][0];
    let end = stops[1][0];
    let interval = init(stops[0][1], stops[1][1]);
    let i = 1;
    l = stops.length - 1;
    for (let t of normRange(n)) {
        if (t > end && t < 1) {
            while (i < l && t > stops[i][0]) i++;
            start = stops[i - 1][0];
            end = stops[i][0];
            interval = init(stops[i - 1][1], stops[i][1]);
        }
        yield mix(interval, end !== start ? (t - start) / (end - start) : 0);
    }
}
