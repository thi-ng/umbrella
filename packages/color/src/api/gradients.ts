import type { FnN, FnU, Tuple } from "@thi.ng/api";
import type { Color, ColorMixFn, ReadonlyColor } from "../api";

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
export type GradientColorStop = [number, ReadonlyColor];

export interface GradientOpts {
    num: number;
    stops: GradientColorStop[];
    mix?: ColorMixFn;
    easing?: FnN;
    tx?: FnU<Color>;
}
