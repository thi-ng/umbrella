import { ColorMode } from "./constants";
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";

export type Color = Vec;
export type ReadonlyColor = ReadonlyVec;

// prettier-ignore
export type ColorMatrix = [
    number, number, number, number, number,
    number, number, number, number, number,
    number, number, number, number, number,
    number, number, number, number, number,
];

export type CosCoeffs = [number, number, number, number];
export type CosGradientSpec = [CosCoeffs, CosCoeffs, CosCoeffs, CosCoeffs];

export type ColorConversion<T> = (out: Color, src: T) => Color;
export type ColorOp = (out: Color | null, src: ReadonlyColor) => Color;

export interface IColor {
    readonly mode: ColorMode;
}
