import type { FnN, FnU, Tuple } from "@thi.ng/api";
import type { Color, ColorMixFn, ReadonlyColor } from "../api.js";

export type CosineGradientPreset =
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
    | "yellow-red";

export type CosineCoeffs = Tuple<number, 4>;

export type CosGradientSpec = Tuple<CosineCoeffs, 4>;

/**
 * A tuple of normalized position and color for a gradient stop.
 */
export type GradientColorStop<T> = [number, T];

export interface GradientOpts<T = ReadonlyColor> {
    /**
     * Number of colors to generate
     */
    num: number;
    /**
     * Gradient color stops, each a `[pos, color]`
     */
    stops: GradientColorStop<T>[];
    /**
     * Interpolation function
     */
    mix?: ColorMixFn<T>;
    /**
     * Easing function
     */
    easing?: FnN;
}

export interface CosineGradientOpts extends GradientOpts {
    /**
     * Post transformation function for each color
     */
    tx?: FnU<Color>;
}
