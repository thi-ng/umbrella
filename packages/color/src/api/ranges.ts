import type { Range } from "@thi.ng/api";
import type { IRandom } from "@thi.ng/random";
import type { ReadonlyColor } from "../api";
import type { CSSColorName } from "./names";

export type ColorRangePreset =
    | "light"
    | "dark"
    | "bright"
    | "weak"
    | "neutral"
    | "fresh"
    | "soft"
    | "hard"
    | "warm"
    | "cool"
    | "intense";

export interface ColorRange {
    /**
     * Hue ranges
     */
    h?: Range[];
    /**
     * Saturation ranges
     */
    s?: Range[];
    /**
     * Brightness ranges
     */
    v?: Range[];
    /**
     * Alpha ranges
     */
    a?: Range[];
    /**
     * Black point ranges
     */
    b?: Range[];
    /**
     * White point ranges
     */
    w?: Range[];
}

export interface ColorRangeOpts {
    /**
     * Nunber of result colors.
     *
     * @defaultValue ∞
     */
    num: number;
    /**
     * If given, MUST be an HSV color and its hue will be used as bias to create
     * a randomized variation (based on {@link ColorRangeOpts.variance}).
     */
    base?: ReadonlyColor;
    /**
     * Max. normalized & randomized hue shift for result colors. Only used if a
     * base color is given.
     *
     * @defaultValue 0.025 (i.e. +/- 9 degrees)
     */
    variance: number;
    /**
     * Tolerance for grayscale check (used for both saturation and brightness).
     *
     * @defaultValue 0.001
     */
    eps: number;
    /**
     * PRNG instance to use for randomized values
     *
     * @defaultValue {@link @thi.ng/random#SYSTEM}
     */
    rnd: IRandom;
}

export interface ColorThemePart {
    /**
     * Color range spec to use
     */
    range?: ColorRange | ColorRangePreset;
    /**
     * HSV(A) base color
     */
    base?: ReadonlyColor | CSSColorName;
    /**
     * Relative weight of this theme part
     *
     * @defaultValue 1.0
     */
    weight?: number;
}

export type ColorThemePartTuple =
    | [ColorRangePreset, CSSColorName, number?]
    | [ColorRangePreset | CSSColorName, number?]
    | ColorRangePreset
    | CSSColorName;
