import type { NumericArray, Without } from "@thi.ng/api";
import { map, noop, push, transduce, tween } from "@thi.ng/transducers";
import { mixN, setS4 } from "@thi.ng/vectors";
import type { Color, ReadonlyColor } from "../api";
import type { GradientOpts } from "../api/gradients";

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
 *     [0, lchLab([], [0.8, 0.2, 0])],
 *     // green
 *     [1 / 3, lchLab([], [0.8, 0.2, 1 / 3])],
 *     // blue
 *     [2 / 3, lchLab([], [0.8, 0.2, 2 / 3])],
 *     // gray
 *     [1, lchLab([], [0.8, 0, 1])],
 *   ],
 *   // optional easing function (per interval)
 *   easing: (t) => schlick(2, t),
 *   // coerce result colors to Oklab
 *   tx: oklab,
 * });
 *
 * // write gradient as SVG swatches
 * writeFileSync(
 *   `export/oklab-multigradient.svg`,
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
export const multiColorGradient = (opts: GradientOpts): Color[] =>
    transduce(opts.tx ? map(opts.tx) : noop(), push<Color>(), gradient(opts));

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
export const multiColorGradientBuffer = (
    opts: Without<GradientOpts, "tx">,
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
const gradient = ({ num, stops, easing, mix }: GradientOpts): Iterable<Color> =>
    tween<ReadonlyColor, ReadonlyColor[], Color>({
        num: num - 1,
        stops,
        easing,
        min: 0,
        max: 1,
        init: (a, b) => [a, b],
        mix: mix
            ? ([a, b], t) => mix([], a, b, t)
            : ([a, b], t) => mixN([], a, b, t),
    });
