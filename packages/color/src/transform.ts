import { mix } from "@thi.ng/math/mix";
import type { ColorMatrix, ReadonlyColor } from "./api";
import { RGB_LUMINANCE_REC709, WHITE } from "./api/constants";
import { __mulM45, __mulV45 } from "./internal/matrix-ops";

// https://drafts.fxtf.org/filter-effects/#feColorMatrixElement

const S0 = 0.072;
const S1 = 0.213;
const S2 = 0.285;
const S3 = 0.715;
const S4 = 0.787;
const S5 = 0.928;
const S6 = 0.14;
const S7 = 0.143;
const S8 = 0.283;

/**
 * Transforms `src` RGBA color with given matrix and stores result in
 * `out` (writes back to `src` if `out` is `null` or `undefined`).
 * Unless `clampOut` is false, the result color will be clamped to `[0,1]`
 * interval.
 *
 * @param out - result
 * @param mat - transform matrix
 * @param src - source color
 * @param clampOut - true, if result should be clamped to [0..1]
 */
export const transform = __mulV45;

/**
 * Concatenates given color matrices by pairwise multiplying them in
 * left-right order. Returns combined result matrix to be used with
 * {@link transform}.
 *
 * @remarks
 * Using {@link concat} is the recommended way when applying multiple
 * color transformations in sequence. Since the transforms are combined
 * into a single matrix, it is faster than multiple, individual
 * {@link transform} calls and will also produce more correct results,
 * since result color clamping is only applied once at the end (by
 * default, unless disabled).
 *
 * @param mat - first matrix
 * @param xs - other matrices
 */
export const concat = (mat: ColorMatrix, ...xs: ColorMatrix[]) =>
    xs.reduce(__mulM45, mat);

// prettier-ignore
export const IDENTITY: ColorMatrix = [
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
 * @param src - source color
 */
// prettier-ignore
export const subtract = (src: ReadonlyColor = WHITE): ColorMatrix => [
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
 * @param x - brightness offset
 */
// prettier-ignore
export const brightness = (x: number): ColorMatrix => [
    1, 0, 0, 0, x,
    0, 1, 0, 0, x,
    0, 0, 1, 0, x,
    0, 0, 0, 1, 0
];

// prettier-ignore
export const contrast = (x: number, o = 0.5 * (1 - x)): ColorMatrix => [
    x, 0, 0, 0, o,
    0, x, 0, 0, o,
    0, 0, x, 0, o,
    0, 0, 0, 1, 0
];

// prettier-ignore
export const exposure = (x: number): ColorMatrix => [
    x, 0, 0, 0, 0,
    0, x, 0, 0, 0,
    0, 0, x, 0, 0,
    0, 0, 0, 1, 0
];

// prettier-ignore
export const saturation = (x: number): ColorMatrix => [
    S1 + S4 * x, S3 - S3 * x, S0 - S0 * x, 0, 0,
    S1 - S1 * x, S3 + S2 * x, S0 - S0 * x, 0, 0,
    S1 - S1 * x, S3 - S3 * x, S0 + S5 * x, 0, 0,
    0, 0, 0, 1, 0
];

// prettier-ignore
export const hueRotate = (theta: number): ColorMatrix => {
    const s = Math.sin(theta);
    const c = Math.cos(theta);
    return [
        S1 + c * S4 - s * S1, S3 - c * S3 - s * S3, S0 - c * S0 + s * S5, 0, 0,
        S1 - c * S1 + s * S7, S3 + c * S2 + s * S6, S0 - c * S0 - s * S8, 0, 0,
        S1 - c * S1 - s * S4, S3 - c * S3 + s * S3, S0 + c * S5 + s * S0, 0, 0,
        0, 0, 0, 1, 0
    ];
};

// prettier-ignore
export const temperature = (x: number): ColorMatrix => [
    1 + x, 0, 0, 0, 0,
    0, 1, 0, 0, 0,
    0, 0, 1 - x, 0, 0,
    0, 0, 0, 1, 0
];

// prettier-ignore
export const sepia = (x = 1): ColorMatrix => [
    mix(1, 0.393, x), 0.769 * x, 0.189 * x, 0, 0,
    0.349 * x, mix(1, 0.686, x), 0.168 * x, 0, 0,
    0.272 * x, 0.534 * x, mix(1, 0.131, x), 0, 0,
    0, 0, 0, 1, 0
];

// prettier-ignore
export const tint = (x: number): ColorMatrix => [
    1 + x, 0, 0, 0, 0,
    0, 1, 0, 0, 0,
    0, 0, 1 + x, 0, 0,
    0, 0, 0, 1, 0
];

/**
 * Returns transformation matrix which computes luminance of user color
 * (optionally with custom coefficients). Does NOT modify alpha channel.
 *
 * @remarks
 * See {@link RGB_LUMINANCE_REC709} for default coefficients
 *
 * @param coeffs - luminance coefficients
 * @param offset - brightness offset
 */
// prettier-ignore
export const grayscale = ([r, g, b] = RGB_LUMINANCE_REC709, offset = 0): ColorMatrix => [
    r, g, b, 0, offset,
    r, g, b, 0, offset,
    r, g, b, 0, offset,
    0, 0, 0, 1, 0
];

/**
 * Returns transformation matrix which computes luminance of user color
 * (optionally with custom coefficients), uses result as alpha channel
 * and clears RGB channels (all set to zero).
 *
 * @remarks
 * See {@link RGB_LUMINANCE_REC709} for default coefficients
 *
 * @param coeffs - luminance coefficients
 */
// prettier-ignore
export const luminanceAlpha = ([r, g, b] = RGB_LUMINANCE_REC709): ColorMatrix => [
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
    r, g, b, 0, 0
];
