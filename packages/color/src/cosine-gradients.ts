import type { FnU2 } from "@thi.ng/api";
import { partial } from "@thi.ng/compose";
import { clamp01, TAU } from "@thi.ng/math";
import {
    map,
    normRange,
    push,
    transduce,
    tween,
    zip,
} from "@thi.ng/transducers";
import type { Color, CosCoeffs, CosGradientSpec, ReadonlyColor } from "./api";
import { clamp } from "./clamp";

export type GradientPresets = Record<
    | "blue-cyan"
    | "blue-magenta-orange"
    | "blue-white-red"
    | "cyan-magenta"
    | "green-blue-orange"
    | "green-cyan"
    | "green-magenta"
    | "green-red"
    | "heat1"
    | "magenta-green"
    | "orange-blue"
    | "orange-magenta-blue"
    | "purple-orange-cyan"
    | "rainbow1"
    | "rainbow2"
    | "rainbow3"
    | "rainbow4"
    | "red-blue"
    | "yellow-green-blue"
    | "yellow-magenta-cyan"
    | "yellow-purple-magenta"
    | "yellow-red",
    CosGradientSpec
>;

// see http://dev.thi.ng/gradients/ - unlike the clojure version, these
// presets are for RGBA (though the alpha channel is configured to
// always be 1.0)
export const GRADIENTS: GradientPresets = {
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

export const cosineColor = (spec: CosGradientSpec, t: number): Color =>
    transduce(
        map<number[], number>(([a, b, c, d]) =>
            clamp01(a + b * Math.cos(TAU * (c * t + d)))
        ),
        push(),
        // @ts-ignore
        zip(...spec)
    );

export const cosineGradient = (n: number, spec: CosGradientSpec) =>
    transduce(map(partial(cosineColor, spec)), push(), normRange(n - 1));

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
        <CosCoeffs>[...map(([s, a]) => s - a, zip(from, amp))],
        <CosCoeffs>amp,
        [-0.5, -0.5, -0.5, -0.5],
        [0, 0, 0, 0],
    ];
};

/**
 * Multi-color cosine gradient generator using RGBA color stops. Returns
 * an array of `n+1` color samples.
 *
 * @example
 * ```ts
 * multiCosineGradient(
 *   // num colors to produce
 *   10,
 *   // gradient stops (normalized positions)
 *   [0.1, [1, 0, 0, 1]], [0.5, [0, 1, 0, 1]], [0.9, [0, 0, 1, 1]]
 * )
 * ```
 *
 * {@link @thi.ng/transducers#tween}
 *
 * @param num - number of color steps to produce
 * @param stops - gradient stops
 */
export const multiCosineGradient = (
    num: number,
    ...stops: [number, ReadonlyColor][]
): Color[] => [
    ...tween({
        num,
        min: 0,
        max: 1,
        init: cosineCoeffs,
        mix: cosineColor,
        stops,
    }),
];
