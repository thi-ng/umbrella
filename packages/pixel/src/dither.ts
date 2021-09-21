import type { NumericArray } from "@thi.ng/api";
import { clamp } from "@thi.ng/math/interval";
import type { BayerMatrix, BayerSize } from "./api";

const init = (
    x: number,
    y: number,
    size: number,
    val: number,
    step: number,
    mat: number[][]
) => {
    if (size === 1) {
        !mat[y] && (mat[y] = []);
        mat[y][x] = val;
        return mat;
    }
    size >>= 1;
    const step4 = step << 2;
    init(x, y, size, val, step4, mat);
    init(x + size, y + size, size, val + step, step4, mat);
    init(x + size, y, size, val + step * 2, step4, mat);
    init(x, y + size, size, val + step * 3, step4, mat);
    return mat;
};

/**
 * Creates a Bayer matrix of given kernel size (power of 2) for ordered
 * dithering and use with {@link ditherPixels}
 *
 * @remarks
 * Reference:
 * - https://en.wikipedia.org/wiki/Ordered_dithering
 *
 * @param size
 */
export const defBayer = (size: BayerSize): BayerMatrix => ({
    mat: init(0, 0, size, 0, 1, []),
    invSize: 1 / (size * size),
    mask: size - 1,
});

/**
 * Single-channel/value ordered dither using provided Bayer matrix.
 *
 * @param mat -  matrix
 * @param dsteps - number of dest colors
 * @param drange - dest color range
 * @param srange - src color range
 * @param x - x pos
 * @param y - y pos
 * @param val - src value
 */
export const orderedDither = (
    { mat, mask, invSize }: BayerMatrix,
    dsteps: number,
    drange: number,
    srange: number,
    x: number,
    y: number,
    val: number
) => {
    val =
        (dsteps * (val / srange) + mat[y & mask][x & mask] * invSize - 0.5) | 0;
    dsteps--;
    return clamp(val, 0, dsteps) * ((drange - 1) / dsteps);
};

/**
 * Applies ordered dither to given single-channel raw pixel array `src`
 * and writes results to `dest` (will be created if `null`).
 *
 * @remarks
 * Also see {@link defBayer} for Bayer matrix creation.
 *
 * @param dest
 * @param src
 * @param width
 * @param height
 * @param mat - bayer dither matrix
 * @param dsteps - target number of color steps
 * @param drange - target color resolution (e.g. 256)
 * @param srange - source color resolution
 */
export const ditherPixels = (
    dest: NumericArray | null,
    src: NumericArray,
    width: number,
    height: number,
    mat: BayerMatrix,
    dsteps: number,
    drange: number,
    srange: number
) => {
    !dest && (dest = src.slice());
    drange--;
    for (let y = 0, i = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            dest[i] = orderedDither(mat, dsteps, drange, srange, x, y, src[i]);
            i++;
        }
    }
    return dest;
};
