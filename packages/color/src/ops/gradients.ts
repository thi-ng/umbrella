import { map, noop, push, transduce, tween } from "@thi.ng/transducers";
import { mixN } from "@thi.ng/vectors";
import type { Color, MultiGradientOpts, ReadonlyColor } from "../api";

/**
 * Similar to {@link multiCosineGradient}, computes a multi-stop color gradient,
 * but for arbitrary color types/spaces.
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
 * @param num
 * @param stops
 * @param tx
 * @param ease
 */
export const multiColorGradient = (opts: MultiGradientOpts): Color[] =>
    transduce(
        opts.tx ? map(opts.tx) : noop(),
        push<Color>(),
        tween<ReadonlyColor, ReadonlyColor[], Color>({
            num: opts.num,
            stops: opts.stops,
            easing: opts.easing,
            min: 0,
            max: 1,
            init: (a, b) => [a, b],
            mix: ([a, b], t) => mixN([], a, b, t),
        })
    );
