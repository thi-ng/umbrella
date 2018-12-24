import { Vec, ReadonlyVec } from "@thi.ng/vectors3/api";
import { float } from "@thi.ng/strings/float";
import { percent } from "@thi.ng/strings/percent";


export type Color = Vec;
export type ReadonlyColor = ReadonlyVec;

export type ColorMatrix = [
    number, number, number, number, number,
    number, number, number, number, number,
    number, number, number, number, number,
    number, number, number, number, number
];

export type CosCoeffs = [number, number, number, number];
export type CosGradientSpec = [CosCoeffs, CosCoeffs, CosCoeffs, CosCoeffs];

export enum ColorMode {
    RGBA,
    HSVA,
    HSLA,
    HSIA,
    INT_ARGB,
    CSS,
}

// RGBA constants

export const BLACK = Object.freeze([0, 0, 0, 1]);
export const WHITE = Object.freeze([1, 1, 1, 1]);

export const RED = Object.freeze([1, 0, 0, 1]);
export const GREEN = Object.freeze([0, 1, 0, 1]);
export const BLUE = Object.freeze([0, 0, 1, 1]);

export const CYAN = Object.freeze([0, 1, 1, 1]);
export const MAGENTA = Object.freeze([1, 0, 1, 1]);
export const YELLOW = Object.freeze([1, 1, 0, 1]);

export const RGB_LUMINANCE = [0.299, 0.587, 0.114];

// internal helpers

export const FF = float(2);
export const PC = percent(2);
export const INV8BIT = 1 / 0xff;
