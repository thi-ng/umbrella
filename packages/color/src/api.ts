import type { Tuple } from "@thi.ng/api";
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";
import { ColorMode } from "./constants";

export type Color = Vec;
export type ReadonlyColor = ReadonlyVec;

/**
 * A 4x5 matrix in column-major order
 */
export type ColorMatrix = Tuple<number, 20>;

export type CosCoeffs = Tuple<number, 4>;
export type CosGradientSpec = Tuple<CosCoeffs, 4>;

export type ColorConversion<T> = (out: Color, src: T) => Color;
export type ColorOp = (out: Color | null, src: ReadonlyColor) => Color;

export interface IColor {
    readonly mode: ColorMode;
}
