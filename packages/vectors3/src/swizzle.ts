import { ReadonlyVec, Vec, VecOpV } from "./api";

/**
 * Places a re-ordered 2D version of vector `a` into `out`. The given
 * coord indices must be valid for `a`. No bounds checking.
 *
 * @param out
 * @param a
 * @param x new x coord index
 * @param y new y coord index
 */
export const swizzle2 =
    (out: Vec, a: ReadonlyVec, x: number, y: number) => (
        x = a[x] || 0,
        out[1] = a[y] || 0,
        out[0] = x,
        out
    );

/**
 * Places a re-ordered 3D version of vector `a` into `out`. The given
 * coord indices must be valid for `a`. No bounds checking.
 *
 * @param out
 * @param a
 * @param x new x coord index
 * @param y new y coord index
 * @param z new z coord index
 */
export const swizzle3 =
    (out: Vec, a: ReadonlyVec, x: number, y: number, z: number) => (
        x = a[x] || 0,
        y = a[y] || 0,
        out[2] = a[z] || 0,
        out[1] = y,
        out[0] = x,
        out
    );

/**
 * Places a re-ordered 4D version of vector `a` into `out`. The given
 * coord indices must be valid for `a`. No bounds checking.
 *
 * @param out
 * @param a
 * @param x new x coord index
 * @param y new y coord index
 * @param z new z coord index
 * @param w new w coord index
 */
export const swizzle4 =
    (out: Vec, a: ReadonlyVec, x: number, y: number, z: number, w: number) => (
        x = a[x] || 0,
        y = a[y] || 0,
        z = a[z] || 0,
        out[3] = a[w] || 0,
        out[2] = z,
        out[1] = y,
        out[0] = x,
        out
    );

export const swapXY: VecOpV =
    (out, v) => swizzle3(out, v, 1, 0, 2);

export const swapXZ: VecOpV =
    (out, v) => swizzle3(out, v, 2, 1, 0);

export const swapYZ: VecOpV =
    (out, v) => swizzle3(out, v, 0, 2, 1);
