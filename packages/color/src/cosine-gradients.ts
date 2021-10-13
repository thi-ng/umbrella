import type { FnU, FnU2, NumericArray } from "@thi.ng/api";
import { partial } from "@thi.ng/compose/partial";
import { TAU } from "@thi.ng/math/api";
import { clamp01 } from "@thi.ng/math/interval";
import { comp } from "@thi.ng/transducers/comp";
import { map } from "@thi.ng/transducers/map";
import { noop } from "@thi.ng/transducers/noop";
import { normRange } from "@thi.ng/transducers/norm-range";
import { push } from "@thi.ng/transducers/push";
import { transduce } from "@thi.ng/transducers/transduce";
import { tween } from "@thi.ng/transducers/tween";
import { zip } from "@thi.ng/transducers/zip";
import { setS4 } from "@thi.ng/vectors/sets";
import type { Color, ReadonlyColor } from "./api.js";
import type {
    CosGradientSpec,
    CosineCoeffs,
    CosineGradientOpts,
    CosineGradientPreset,
} from "./api/gradients.js";
import { clamp } from "./clamp.js";

/**
 * Preset cosine gradient definitions. See previews at:
 * https://github.com/thi-ng/umbrella/tree/develop/packages/color#cosine-gradients
 *
 * @remarks
 * See http://dev.thi.ng/gradients/ for a gradient designer. Note: unlike the
 * linked original Clojure version, these presets here are for RGBA (though the
 * alpha channel is configured to always be 1.0)
 */
export const COSINE_GRADIENTS: Record<CosineGradientPreset, CosGradientSpec> = {
    "blue-cyan": [
        [0, 0.5, 0.5, 1],
        [0, 0.5, 0.5, 0],
        [0, 0.5, 0.3333, 0],
        [0, 0.5, 0.6666, 0],
    ],
    "blue-magenta-orange": [
        [0.938, 0.328, 0.718, 1],
        [0.659, 0.438, 0.328, 0],
        [0.388, 0.388, 0.296, 0],
        [2.538, 2.478, 0.168, 0],
    ],
    "blue-white-red": [
        [0.66, 0.56, 0.68, 1],
        [0.718, 0.438, 0.72, 0],
        [0.52, 0.8, 0.52, 0],
        [-0.43, -0.397, -0.083, 0],
    ],
    "cyan-magenta": [
        [0.61, 0.498, 0.65, 1],
        [0.388, 0.498, 0.35, 0],
        [0.53, 0.498, 0.62, 0],
        [3.438, 3.012, 4.025, 0],
    ],
    "green-blue-orange": [
        [0.892, 0.725, 0, 1],
        [0.878, 0.278, 0.725, 0],
        [0.332, 0.518, 0.545, 0],
        [2.44, 5.043, 0.732, 0],
    ],
    "green-cyan": [
        [0, 0.5, 0.5, 1],
        [0, 0.5, 0.5, 0],
        [0, 0.3333, 0.5, 0],
        [0, 0.6666, 0.5, 0],
    ],
    "green-magenta": [
        [0.6666, 0.5, 0.5, 1],
        [0.5, 0.6666, 0.5, 0],
        [0.6666, 0.666, 0.5, 0],
        [0.2, 0, 0.5, 0],
    ],
    "green-red": [
        [0.5, 0.5, 0, 1],
        [0.5, 0.5, 0, 0],
        [0.5, 0.5, 0, 0],
        [0.5, 0, 0, 0],
    ],
    heat1: [
        [0.5, 0.4, 0.25, 1],
        [0.5, 0.5, 0.666, 0],
        [0.5, 0.666, 0.8, 0],
        [0.5, 0.666, 0.8, 0],
    ],
    "magenta-green": [
        [0.59, 0.811, 0.12, 1],
        [0.41, 0.392, 0.59, 0],
        [0.94, 0.548, 0.278, 0],
        [-4.242, -6.611, -4.045, 0],
    ],
    "orange-blue": [
        [0.5, 0.5, 0.5, 1],
        [0.5, 0.5, 0.5, 0],
        [0.8, 0.8, 0.5, 0],
        [0, 0.2, 0.5, 0],
    ],
    "orange-magenta-blue": [
        [0.821, 0.328, 0.242, 1],
        [0.659, 0.481, 0.896, 0],
        [0.612, 0.34, 0.296, 0],
        [2.82, 3.026, -0.273, 0],
    ],
    "purple-orange-cyan": [
        [0.5, 0.5, 0.5, 1],
        [0.5, 0.5, 0.5, 0],
        [0.5, 0.5, 1, 0],
        [-0.25, 0.5, 1, 0],
    ],
    rainbow1: [
        [0.5, 0.5, 0.5, 1],
        [0.5, 0.5, 0.5, 0],
        [1.0, 1.0, 1.0, 0],
        [0, 0.3333, 0.6666, 0],
    ],
    rainbow2: [
        [0.5, 0.5, 0.5, 1],
        [0.666, 0.666, 0.666, 0],
        [1.0, 1.0, 1.0, 0],
        [0, 0.3333, 0.6666, 0],
    ],
    rainbow3: [
        [0.5, 0.5, 0.5, 1],
        [0.75, 0.75, 0.75, 0],
        [1.0, 1.0, 1.0, 0],
        [0, 0.3333, 0.6666, 0],
    ],
    rainbow4: [
        [0.5, 0.5, 0.5, 1],
        [1, 1, 1, 0],
        [1.0, 1.0, 1.0, 0],
        [0, 0.3333, 0.6666, 0],
    ],
    "red-blue": [
        [0.5, 0, 0.5, 1],
        [0.5, 0, 0.5, 0],
        [0.5, 0, 0.5, 0],
        [0, 0, 0.5, 0],
    ],
    "yellow-green-blue": [
        [0.65, 0.5, 0.31, 1],
        [-0.65, 0.5, 0.6, 0],
        [0.333, 0.278, 0.278, 0],
        [0.66, 0, 0.667, 0],
    ],
    "yellow-magenta-cyan": [
        [1, 0.5, 0.5, 1],
        [0.5, 0.5, 0.5, 0],
        [0.75, 1.0, 0.6666, 0],
        [0.8, 1.0, 0.3333, 0],
    ],
    "yellow-purple-magenta": [
        [0.731, 1.098, 0.192, 1],
        [0.358, 1.09, 0.657, 0],
        [1.077, 0.36, 0.328, 0],
        [0.965, 2.265, 0.837, 0],
    ],
    "yellow-red": [
        [0.5, 0.5, 0, 1],
        [0.5, 0.5, 0, 0],
        [0.1, 0.5, 0, 0],
        [0, 0, 0, 0],
    ],
};

/**
 * Computes a single linear RGBA color for given gradient spec and normalized
 * position `t` (in [0..1] interval).
 *
 * @param spec
 * @param t
 */
export const cosineColor = (spec: CosGradientSpec, t: number): Color =>
    transduce(
        map<number[], number>(([a, b, c, d]) =>
            clamp01(a + b * Math.cos(TAU * (c * t + d)))
        ),
        push(),
        // @ts-ignore
        zip(...spec)
    );

/**
 * Computes a full cosine gradient and returns an array of `n` sampled linear
 * RGBA colors. If the optional `tx` is given, each computed color will be
 * re-interpreted and/or transformed into another {@link Color} type.
 *
 * @remarks
 * For CSS/SVG use cases you could use {@link srgba} as transformation function
 * to not convert, but reinterpret & wrap raw color values as SRGBA.
 *
 * @param n
 * @param spec
 * @param tx
 */
export const cosineGradient = (
    n: number,
    spec: CosGradientSpec,
    tx?: FnU<Color>
): Color[] =>
    transduce(
        comp(map(partial(cosineColor, spec)), tx ? map(tx) : noop()),
        push<Color>(),
        normRange(n - 1)
    );

/**
 * Similar to {@link cosineGradient}, but writes results into `buffer` from
 * given `offset` and component/element strides. Returns buffer.
 *
 * @remarks
 * Intended use case for this function: 1D texturemap/tonemap generation, e.g.
 * for dataviz etc. Also @see {@link multiColorGradientBuffer}.
 *
 * @param n -  number of colors
 * @param spec - gradient spec
 * @param buffer - target buffer/array
 * @param offset - start index (default: 0)
 * @param cstride - channel stride (default: 1)
 * @param estride - element stride (default: 4)
 */
export const cosineGradientBuffer = (
    n: number,
    spec: CosGradientSpec,
    buffer: NumericArray = [],
    offset = 0,
    cstride = 1,
    estride = 4
) => {
    for (let t of normRange(n - 1)) {
        setS4(buffer, cosineColor(spec, t), offset, 0, cstride);
        offset += estride;
    }
    return buffer;
};

/**
 * Returns coefficients to produce a cosine gradient between the two
 * given RGBA colors.
 *
 * @param from - start color
 * @param to - end color
 */
export const cosineCoeffs: FnU2<ReadonlyColor, CosGradientSpec> = (
    from,
    to
) => {
    from = clamp([], from);
    to = clamp([], to);
    const amp = [...map(([a, b]) => 0.5 * (a - b), zip(from, to))];
    return [
        <CosineCoeffs>[...map(([s, a]) => s - a, zip(from, amp))],
        <CosineCoeffs>amp,
        [-0.5, -0.5, -0.5, -0.5],
        [0, 0, 0, 0],
    ];
};

/**
 * Multi-color cosine gradient generator using linear RGBA color stops. Returns
 * an array of `n+1` linear RGBA color samples.
 *
 * @remarks
 * @see {@link @thi.ng/transducers#tween}
 *
 * @example
 * ```ts
 * multiCosineGradient({
 *   num: 10,
 *   // gradient stops (normalized positions)
 *   stops: [[0.1, [1, 0, 0, 1]], [0.5, [0, 1, 0, 1]], [0.9, [0, 0, 1, 1]]],
 *   // optional color transform/coercion
 *   tx: srgba
 * })
 * ```
 *
 * @param num - number of color steps to produce
 * @param stops - gradient stops
 */
export const multiCosineGradient = (opts: CosineGradientOpts): Color[] =>
    transduce(
        opts.tx ? map(opts.tx) : noop(),
        push<Color>(),
        tween({
            num: opts.num,
            stops: opts.stops,
            easing: opts.easing,
            min: 0,
            max: 1,
            init: cosineCoeffs,
            mix: cosineColor,
        })
    );
