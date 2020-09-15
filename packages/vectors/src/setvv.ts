import type { ReadonlyVec, Vec, VecOpVV, VecOpVVV } from "./api";
import { setC, setC4, setC6 } from "./setc";

/**
 * Sets `out` to `[a.x, a.y, b.x, b.y]`
 *
 * @param out -
 * @param a -
 * @param b -
 */
export const setVV4: VecOpVV = (out, a, b) =>
    setC4(out, a[0], a[1], b[0], b[1]);

/**
 * Sets `out` to `[a.x, a.y, b.x, b.y, c.x, c.y]`
 *
 * @param out -
 * @param a -
 * @param b -
 * @param c -
 */
export const setVV6: VecOpVVV = (out, a, b, c) =>
    setC6(out, a[0], a[1], b[0], b[1], c[0], c[1]);

/**
 * Sets `out` to:
 * `[a.x, a.y, a.z, b.x, b.y, b.z, c.x, c.y, c.z]`
 *
 * @param out -
 * @param a -
 * @param b -
 * @param c -
 */
export const setVV9: VecOpVVV = (out, a, b, c) =>
    setC(out, a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2]);

/**
 * Sets `out` to concatenation of `a`, `b`, `c`, `d`:
 *
 * @example
 * ```ts
 * [a.x, a.y, a.z, a.w, b.x, b.y, b.z, b.w,
 *  c.x, c.y, c.z, c.w, d.x, d.y, d.z, d.w]
 * ```
 *
 * @param out -
 * @param a -
 * @param b -
 * @param c -
 */
export const setVV16 = (
    out: Vec | null,
    a: ReadonlyVec,
    b: ReadonlyVec,
    c: ReadonlyVec,
    d: ReadonlyVec
) =>
    setC(
        out,
        a[0],
        a[1],
        a[2],
        a[3],
        b[0],
        b[1],
        b[2],
        b[3],
        c[0],
        c[1],
        c[2],
        c[3],
        d[0],
        d[1],
        d[2],
        d[3]
    );
