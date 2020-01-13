import { expFactor, fit } from "@thi.ng/math";

/**
 * Iterator yielding `steps` + 1 interpolated values along an
 * exponential curve in the closed `[start .. end]` interval. The
 * curvature can be controlled via `falloff` (default: 1), which is used
 * as a power of 10 to compute the exponential decay / growth factor.
 * Use `falloff` < 0 for ease in or > 0 for ease out.
 *
 * @example
 * ```ts
 * [...curve(50, 100, 10, 2)]
 * // [
 * //   50,
 * //   70.228,
 * //   82.354,
 * //   89.624,
 * //   93.982,
 * //   96.594,
 * //   98.160,
 * //   99.099,
 * //   99.662,
 * //   100
 * // ]
 * ```
 *
 * @param start -
 * @param end -
 * @param steps -
 * @param falloff -
 */
export function* curve(start: number, end: number, steps = 10, falloff = 1) {
    const fe = 1 / 10 ** falloff;
    const f = expFactor(1, fe, steps - 1);
    let t = 1;
    for (; --steps >= 0; ) {
        yield fit(t, 1, fe, start, end);
        t *= f;
    }
}
