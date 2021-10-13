import type { NumericArray } from "@thi.ng/api";
import { tween } from "@thi.ng/transducers/tween";
import { setS4 } from "@thi.ng/vectors/sets";
import type { TypedColor } from "./api.js";
import type { GradientOpts } from "./api/gradients.js";
import { mix as $mix } from "./mix.js";

/**
 * Similar to {@link multiCosineGradient}, but using any number of gradient
 * color stops and isn't limited to RGB, but for arbitrary color types.
 *
 * @remarks
 * @see {@link @thi.ng/transducers#tween}
 *
 * @example
 * ```ts
 * gradient = multiColorGradient({
 *   num: 100,
 *   // LAB color stops
 *   stops: [
 *     // pink red
 *     [0, lch(0.8, 0.8, 0)],
 *     // green
 *     [1 / 3, lch(0.8, 0.8, 1 / 3)],
 *     // blue
 *     [2 / 3, lch(0.8, 0.8, 2 / 3)],
 *     // gray
 *     [1, lch(0.8, 0, 1)],
 *   ]
 * });
 *
 * // write gradient as SVG swatches
 * writeFileSync(
 *   `export/lch-multigradient.svg`,
 *   serialize(
 *     svg(
 *       { width: 500, height: 50, convert: true },
 *       swatchesH(gradient, 5, 50)
 *     )
 *   )
 * );
 * ```
 *
 * @param opts
 */
export const multiColorGradient = <T extends TypedColor<any>>(
    opts: GradientOpts<T>
) => [...gradient(opts)];

/**
 * Similar to {@link multiColorGradient}, but writes results into `buffer` from
 * given `offset` and component/element strides. Returns buffer.
 *
 * @remarks
 * Intended use case for this function: 1D texturemap/tonemap generation, e.g.
 * for dataviz etc. Also @see {@link cosineGradientBuffer}.
 *
 * @param opts
 * @param buffer - target buffer/array
 * @param offset - start index (default: 0)
 * @param cstride - channel stride (default: 1)
 * @param estride - element stride (default: 4)
 */
export const multiColorGradientBuffer = <T extends TypedColor<any>>(
    opts: GradientOpts<T>,
    buffer: NumericArray = [],
    offset = 0,
    cstride = 1,
    estride = 4
) => {
    for (let col of gradient(opts)) {
        setS4(buffer, col, offset, 0, cstride);
        offset += estride;
    }
    return buffer;
};

/** @internal */
const gradient = <T extends TypedColor<any>>({
    num,
    stops,
    easing,
    mix,
}: GradientOpts<T>): Iterable<T> =>
    tween<T, T[], T>({
        num: num - 1,
        stops,
        easing,
        min: 0,
        max: 1,
        init: (a, b) => [a, b],
        mix: mix
            ? ([a, b], t) => <T>mix(a.empty(), a, b, t)
            : ([a, b], t) => <T>$mix(a.empty(), a, b, t),
    });
