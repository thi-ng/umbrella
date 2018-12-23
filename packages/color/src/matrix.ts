import { clamp01 } from "@thi.ng/math/interval";
import { mix } from "@thi.ng/math/mix";
import { dotS4 } from "@thi.ng/vectors3/dots";
import { setC4 } from "@thi.ng/vectors3/setc";
import {
    Color,
    ColorMatrix,
    ReadonlyColor,
    RGB_LUMINANCE
} from "./api";

// https://drafts.fxtf.org/filter-effects/#feColorMatrixElement

const S0 = 0.072;
const S1 = 0.213;
const S2 = 0.285;
const S3 = 0.715;
const S4 = 0.787;
const S5 = 0.928;
const S6 = 0.140;
const S7 = 0.143;
const S8 = 0.283;

export const applyMatrix =
    (out: Color, mat: ColorMatrix, rgba: ReadonlyColor, clampOut = true) =>
        clampOut ?
            setC4(
                out || rgba,
                clamp01(dotS4(rgba, mat, 0, 0) + mat[4]),
                clamp01(dotS4(rgba, mat, 0, 5) + mat[9]),
                clamp01(dotS4(rgba, mat, 0, 10) + mat[14]),
                clamp01(dotS4(rgba, mat, 0, 15) + mat[19])
            ) :
            setC4(
                out || rgba,
                dotS4(rgba, mat, 0, 0) + mat[4],
                dotS4(rgba, mat, 0, 5) + mat[9],
                dotS4(rgba, mat, 0, 10) + mat[14],
                dotS4(rgba, mat, 0, 15) + mat[19]
            );

export const mulMatrix =
    (a: ColorMatrix, b: ColorMatrix): ColorMatrix => [
        dotS4(a, b, 0, 0, 1, 5),
        dotS4(a, b, 0, 1, 1, 5),
        dotS4(a, b, 0, 2, 1, 5),
        dotS4(a, b, 0, 3, 1, 5),
        dotS4(a, b, 0, 4, 1, 5) + a[4],
        dotS4(a, b, 5, 0, 1, 5),
        dotS4(a, b, 5, 1, 1, 5),
        dotS4(a, b, 5, 2, 1, 5),
        dotS4(a, b, 5, 3, 1, 5),
        dotS4(a, b, 5, 4, 1, 5) + a[9],
        dotS4(a, b, 10, 0, 1, 5),
        dotS4(a, b, 10, 1, 1, 5),
        dotS4(a, b, 10, 2, 1, 5),
        dotS4(a, b, 10, 3, 1, 5),
        dotS4(a, b, 10, 4, 1, 5) + a[14],
        dotS4(a, b, 15, 0, 1, 5),
        dotS4(a, b, 15, 1, 1, 5),
        dotS4(a, b, 15, 2, 1, 5),
        dotS4(a, b, 15, 3, 1, 5),
        dotS4(a, b, 15, 4, 1, 5) + a[19],
    ];

export const concatMatrices =
    (mat: ColorMatrix, ...xs: ColorMatrix[]) =>
        xs.reduce(mulMatrix, mat);

export const IDENTITY: ColorMatrix =
    [
        1, 0, 0, 0, 0,
        0, 1, 0, 0, 0,
        0, 0, 1, 0, 0,
        0, 0, 0, 1, 0
    ];

export const INVERT: ColorMatrix =
    [
        -1, 0, 0, 0, 1,
        0, -1, 0, 0, 1,
        0, 0, -1, 0, 1,
        0, 0, 0, 1, 0
    ];

export const brightness =
    (x: number): ColorMatrix =>
        [
            1, 0, 0, 0, x,
            0, 1, 0, 0, x,
            0, 0, 1, 0, x,
            0, 0, 0, 1, 0
        ];

export const contrast =
    (x: number, o = 0.5 * (1 - x)): ColorMatrix =>
        [
            x, 0, 0, 0, o,
            0, x, 0, 0, o,
            0, 0, x, 0, o,
            0, 0, 0, 1, 0
        ];

export const exposure =
    (x: number): ColorMatrix =>
        [
            x, 0, 0, 0, 0,
            0, x, 0, 0, 0,
            0, 0, x, 0, 0,
            0, 0, 0, 1, 0
        ];

export const saturation =
    (x: number): ColorMatrix =>
        [
            S1 + S4 * x, S3 - S3 * x, S0 - S0 * x, 0, 0,
            S1 - S1 * x, S3 + S2 * x, S0 - S0 * x, 0, 0,
            S1 - S1 * x, S3 - S3 * x, S0 + S5 * x, 0, 0,
            0, 0, 0, 1, 0
        ];

export const hueRotation =
    (theta: number): ColorMatrix => {
        const s = Math.sin(theta);
        const c = Math.cos(theta);
        return [
            S1 + c * S4 - s * S1,
            S3 - c * S3 - s * S3,
            S0 - c * S0 + s * S5,
            0, 0,
            S1 - c * S1 + s * S7,
            S3 + c * S2 + s * S6,
            S0 - c * S0 - s * S8,
            0, 0,
            S1 - c * S1 - s * S4,
            S3 - c * S3 + s * S3,
            S0 + c * S5 + s * S0,
            0, 0,
            0, 0, 0, 1, 0,
        ];
    };

export const temperature =
    (x: number): ColorMatrix =>
        [
            1 + x, 0, 0, 0, 0,
            0, 1, 0, 0, 0,
            0, 0, 1 - x, 0, 0,
            0, 0, 0, 1, 0
        ];

export const sepia =
    (x = 1): ColorMatrix =>
        [
            mix(1, 0.393, x), 0.769 * x, 0.189 * x, 0, 0,
            0.349 * x, mix(1, 0.686, x), 0.168 * x, 0, 0,
            0.272 * x, 0.534 * x, mix(1, 0.131, x), 0, 0,
            0, 0, 0, 1, 0
        ];

export const tint =
    (x: number): ColorMatrix =>
        [
            1 + x, 0, 0, 0, 0,
            0, 1, 0, 0, 0,
            0, 0, 1 + x, 0, 0,
            0, 0, 0, 1, 0
        ];

export const grayscale =
    (x = 0, [r, g, b] = RGB_LUMINANCE): ColorMatrix =>
        [
            r, g, b, 0, x,
            r, g, b, 0, x,
            r, g, b, 0, x,
            0, 0, 0, 1, 0
        ];

export const luminanceAlpha =
    ([r, g, b] = RGB_LUMINANCE): ColorMatrix =>
        [
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            r, g, b, 0, 0
        ];
