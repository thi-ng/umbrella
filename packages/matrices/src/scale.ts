import { isNumber } from "@thi.ng/checks";
import { ReadonlyVec, setC, setC4, setC6 } from "@thi.ng/vectors";
import type { Mat } from "./api";

/**
 * Computes 2x2 matrix scale matrix and writes result to `out`. If `s`
 * is a number, scaling will be uniform.
 *
 * @param m -
 * @param s -
 */
export const scale22 = (m: Mat | null, s: number | ReadonlyVec) => (
    (s = isNumber(s) ? [s, s] : s), setC4(m || [], s[0], 0, 0, s[1])
);

/**
 * Computes 2x3 matrix scale matrix and writes result to `out`. If `s`
 * is a number, scaling will be uniform.
 *
 * @param m -
 * @param s -
 */
export const scale23 = (m: Mat | null, s: number | ReadonlyVec) => (
    (s = isNumber(s) ? [s, s] : s), setC6(m || [], s[0], 0, 0, s[1], 0, 0)
);

/**
 * Computes 3x3 matrix scale matrix and writes result to `out`. If `s`
 * is a number, scaling will be uniform.
 *
 * @param m -
 * @param s -
 */
export const scale33 = (m: Mat | null, s: number | ReadonlyVec) => (
    (s = isNumber(s) ? [s, s, s] : s),
    setC(m || [], s[0], 0, 0, 0, s[1], 0, 0, 0, s[2])
);

/**
 * Computes 4x4 matrix scale matrix and writes result to `out`. If `s`
 * is a number, scaling will be uniform.
 *
 * @param m -
 * @param s -
 */
export const scale44 = (m: Mat | null, s: number | ReadonlyVec) => (
    (s = isNumber(s) ? [s, s, s] : s),
    setC(
        m || [],
        // x
        s[0],
        0,
        0,
        0,
        // y
        0,
        s[1],
        0,
        0,
        // z
        0,
        0,
        s[2],
        0,
        // w
        0,
        0,
        0,
        s[3] !== undefined ? s[3] : 1
    )
);
