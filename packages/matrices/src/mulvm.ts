import type { ReadonlyVec, Vec } from "@thi.ng/vectors";
import { dot2, dot3, dot4 } from "@thi.ng/vectors/dot";
import { dotS2, dotS3, dotS4 } from "@thi.ng/vectors/dots";
import { setC2, setC3, setC4 } from "@thi.ng/vectors/setc";
import type { ReadonlyMat } from "./api.js";

/**
 * Same as:
 *
 * @example
 * ```ts
 * out[0] = dot(v, column(m, 0))
 * out[1] = dot(v, column(m, 1))
 * ```
 *
 * @param out -
 * @param v -
 * @param m -
 */
export const mulVM22 = (out: Vec | null, v: ReadonlyVec, m: ReadonlyMat) =>
    setC2(out, dot2(v, m), dotS2(v, m, 0, 2));

export const mulVM23 = mulVM22;

/**
 * Same as:
 *
 * @example
 * ```ts
 * out[0] = dot(v, column(m, 0))
 * out[1] = dot(v, column(m, 1))
 * out[2] = dot(v, column(m, 2))
 * ```
 *
 * @param out -
 * @param v -
 * @param m -
 */
export const mulVM33 = (out: Vec | null, v: ReadonlyVec, m: ReadonlyMat) =>
    setC3(out, dot3(v, m), dotS3(v, m, 0, 3), dotS3(v, m, 0, 6));

/**
 * Same as:
 *
 * @example
 * ```ts
 * out[0] = dot(v, column(m, 0))
 * out[1] = dot(v, column(m, 1))
 * out[2] = dot(v, column(m, 2))
 * out[3] = dot(v, column(m, 3))
 * ```
 *
 * @param out -
 * @param v -
 * @param m -
 */
export const mulVM44 = (out: Vec | null, v: ReadonlyVec, m: ReadonlyMat) =>
    setC4(
        out,
        dot4(v, m),
        dotS4(v, m, 0, 4),
        dotS4(v, m, 0, 8),
        dotS4(v, m, 0, 12)
    );
