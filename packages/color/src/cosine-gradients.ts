import { IObjectOf } from "@thi.ng/api";
import { partial } from "@thi.ng/compose";
import { clamp01, TAU } from "@thi.ng/math";
import {
    interpolate,
    map,
    normRange,
    push,
    transduce,
    zip
} from "@thi.ng/transducers";
import { Color, CosGradientSpec, ReadonlyColor } from "./api";
import { clamp } from "./clamp";

// see http://dev.thi.ng/gradients/ - unlike the clojure version, these
// presets are for RGBA (though the alpha channel is configured to
// always be 1.0)

export const GRADIENTS: IObjectOf<CosGradientSpec> = {
    "blue-cyan": [[0, 0.5, 0.5, 1], [0, 0.5, 0.5, 0], [0, 0.5, 0.3333, 0], [0, 0.5, 0.6666, 0]],
    "blue-magenta-orange": [[0.938, 0.328, 0.718, 1], [0.659, 0.438, 0.328, 0], [0.388, 0.388, 0.296, 0], [2.538, 2.478, 0.168, 0]],
    "blue-white-red": [[0.660, 0.56, 0.680, 1], [0.718, 0.438, 0.720, 0], [0.520, 0.8, 0.520, 0], [-0.430, -0.397, -0.083, 0]],
    "cyan-magenta": [[0.610, 0.498, 0.650, 1], [0.388, 0.498, 0.350, 0], [0.530, 0.498, 0.620, 0], [3.438, 3.012, 4.025, 0]],
    "green-blue-orange": [[0.892, 0.725, 0, 1], [0.878, 0.278, 0.725, 0], [0.332, 0.518, 0.545, 0], [2.440, 5.043, 0.732, 0]],
    "green-cyan": [[0, 0.5, 0.5, 1], [0, 0.5, 0.5, 0], [0, 0.3333, 0.5, 0], [0, 0.6666, 0.5, 0]],
    "green-magenta": [[0.6666, 0.5, 0.5, 1], [0.5, 0.6666, 0.5, 0], [0.6666, 0.666, 0.5, 0], [0.2, 0, 0.5, 0]],
    "green-red": [[0.5, 0.5, 0, 1], [0.5, 0.5, 0, 0], [0.5, 0.5, 0, 0], [0.5, 0, 0, 0]],
    "magenta-green": [[0.590, 0.811, 0.120, 1], [0.410, 0.392, 0.590, 0], [0.940, 0.548, 0.278, 0], [-4.242, -6.611, -4.045, 0]],
    "orange-blue": [[0.5, 0.5, 0.5, 1], [0.5, 0.5, 0.5, 0], [0.8, 0.8, 0.5, 0], [0, 0.2, 0.5, 0]],
    "orange-magenta-blue": [[0.821, 0.328, 0.242, 1], [0.659, 0.481, 0.896, 0], [0.612, 0.340, 0.296, 0], [2.820, 3.026, -0.273, 0]],
    "rainbow1": [[0.5, 0.5, 0.5, 1], [0.5, 0.5, 0.5, 0], [1.0, 1.0, 1.0, 0], [0, 0.3333, 0.6666, 0]],
    "rainbow2": [[0.5, 0.5, 0.5, 1], [0.666, 0.666, 0.666, 0], [1.0, 1.0, 1.0, 0], [0, 0.3333, 0.6666, 0]],
    "rainbow3": [[0.5, 0.5, 0.5, 1], [0.75, 0.75, 0.75, 0], [1.0, 1.0, 1.0, 0], [0, 0.3333, 0.6666, 0]],
    "rainbow4": [[0.5, 0.5, 0.5, 1], [1, 1, 1, 0], [1.0, 1.0, 1.0, 0], [0, 0.3333, 0.6666, 0]],
    "red-blue": [[0.5, 0, 0.5, 1], [0.5, 0, 0.5, 0], [0.5, 0, 0.5, 0], [0, 0, 0.5, 0]],
    "yellow-green-blue": [[0.650, 0.5, 0.310, 1], [-0.650, 0.5, 0.6, 0], [0.333, 0.278, 0.278, 0], [0.660, 0, 0.667, 0]],
    "yellow-magenta-cyan": [[1, 0.5, 0.5, 1], [0.5, 0.5, 0.5, 0], [0.75, 1.0, 0.6666, 0], [0.8, 1.0, 0.3333, 0]],
    "yellow-purple-magenta": [[0.731, 1.098, 0.192, 1], [0.358, 1.090, 0.657, 0], [1.077, 0.360, 0.328, 0], [0.965, 2.265, 0.837, 0]],
    "yellow-red": [[0.5, 0.5, 0, 1], [0.5, 0.5, 0, 0], [0.1, 0.5, 0, 0], [0, 0, 0, 0]],
};

export const cosineColor =
    (spec: CosGradientSpec, t: number): Color =>
        transduce(
            map<number[], number>(
                ([a, b, c, d]) => clamp01(a + b * Math.cos(TAU * (c * t + d)))
            ),
            push(),
            zip(...spec)
        );

export const cosineGradient =
    (n: number, spec: CosGradientSpec) =>
        transduce(
            map(partial(cosineColor, spec)),
            push(),
            normRange(n - 1)
        );

/**
 * Returns coefficients to produce a cosine gradient between the two
 * given RGBA colors.
 *
 * @param from
 * @param to
 */
export const cosineCoeffs =
    (from: ReadonlyColor, to: ReadonlyColor) => {
        from = clamp([], from);
        to = clamp([], to);
        const amp = [...map(([a, b]) => 0.5 * (a - b), zip(from, to))];
        return <CosGradientSpec>[
            [...map(([s, a]) => s - a, zip(from, amp))],
            amp,
            [-0.5, -0.5, -0.5, -0.5],
            [0, 0, 0, 0]
        ];
    };

/**
 * Multi-color cosine gradient generator using RGBA color stops. Returns
 * an array of `n+1` color samples.
 *
 * ```
 * multiCosineGradient(
 *   // num colors to produce
 *   10,
 *   // gradient stops (normalized positions)
 *   [0.1, [1, 0, 0, 1]], [0.5, [0, 1, 0, 1]], [0.9, [0, 0, 1, 1]]
 * )
 * ```
 *
 * @see thi.ng/transducers/iter/interpolate
 *
 * @param n
 * @param stops
 */
export const multiCosineGradient =
    (n: number, ...stops: [number, ReadonlyColor][]): Color[] =>
        [...interpolate(
            n,
            0,
            1,
            cosineCoeffs,
            cosineColor,
            ...stops
        )];
