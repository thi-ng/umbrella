import { mix } from "@thi.ng/math";
import { ColorMatrix, RGB_LUMINANCE, ReadonlyColor, WHITE } from "./api";
import { mulV45, mulM45 } from "./internal/matrix-ops";

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

/**
 * Transforms `src` RGBA color with given matrix and stores result in
 * `out` (writes back to `src` if `out` is `null` or `undefined`).
 * Unless `clampOut` is false, the result color will be clamped to `[0,1]`
 * interval.
 *
 * @param out
 * @param mat
 * @param src
 * @param clampOut
 */
export const transform = mulV45;

/**
 * Concatenates given color matrices by pairwise multiplying them in
 * left-right order. Returns combined result matrix to be used with
 * `transform()`.
 *
 * Note: Using `concat()` is the recommended way when applying multiple
 * color transformations in sequence. Since the transforms are combined
 * into a single matrix, it is faster than multiple, individual
 * `transform()` calls and will also produce more correct results, since
 * result color clamping is only applied once at the end (by default,
 * unless disabled).
 *
 * @see transform
 * @param mat
 * @param xs
 */
export const concat =
    (mat: ColorMatrix, ...xs: ColorMatrix[]) =>
        xs.reduce(mulM45, mat);

export const IDENTITY: ColorMatrix =
    [
        1, 0, 0, 0, 0,
        0, 1, 0, 0, 0,
        0, 0, 1, 0, 0,
        0, 0, 0, 1, 0
    ];

/**
 * Returns a transformation matrix which subtracts user color from given
 * `src` color. With the default color white, this results in the
 * inverted color. Does NOT modify alpha channel.
 *
 * @param src
 */
export const subtract =
    (src: ReadonlyColor = WHITE): ColorMatrix =>
        [
            -1, 0, 0, 0, src[0],
            0, -1, 0, 0, src[1],
            0, 0, -1, 0, src[2],
            0, 0, 0, 1, 0
        ];

/**
 * Returns a transformation matrix which adds the given constant offset
 * `x` to RGB channels. Does NOT modify alpha channel.
 *
 * If `x < 0` results in darker color.
 * If `x > 0` results in brighter color.
 *
 * @param x
 */
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

export const hueRotate =
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

/**
 * Returns transformation matrix which computes luminance of user color
 * (optionally with custom coefficients). Does NOT modify alpha channel.
 *
 * @param x
 * @param coeffs
 */
export const grayscale =
    (x = 0, [r, g, b] = RGB_LUMINANCE): ColorMatrix =>
        [
            r, g, b, 0, x,
            r, g, b, 0, x,
            r, g, b, 0, x,
            0, 0, 0, 1, 0
        ];

/**
 * Returns transformation matrix which computes luminance of user color
 * (optionally with custom coefficients), uses result as alpha channel
 * and clears RGB channels (all set to zero).
 *
 * @param coeffs
 */
export const luminanceAlpha =
    ([r, g, b] = RGB_LUMINANCE): ColorMatrix =>
        [
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            r, g, b, 0, 0
        ];
