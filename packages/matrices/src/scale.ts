import { isNumber } from "@thi.ng/checks";
import { ReadonlyVec, setC, setC4, setC6 } from "@thi.ng/vectors";
import { Mat } from "./api";

/**
 * Computes M22 scale matrix and writes result to `out`. If `s` is a
 * number, scaling will be uniform.
 *
 * @param m
 * @param s
 */
export const scale22 = (m: Mat, s: number | ReadonlyVec) => (
    (s = isNumber(s) ? [s, s] : s), setC4(m || [], s[0], 0, 0, s[1])
);

/**
 * Computes M23 scale matrix and writes result to `out`. If `s` is a
 * number, scaling will be uniform.
 *
 * @param m
 * @param s
 */
export const scale23 = (m: Mat, s: number | ReadonlyVec) => (
    (s = isNumber(s) ? [s, s] : s), setC6(m || [], s[0], 0, 0, s[1], 0, 0)
);

/**
 * Computes M33 scale matrix and writes result to `out`. If `s` is a
 * number, scaling will be uniform.
 *
 * @param m
 * @param s
 */
export const scale33 = (m: Mat, s: number | ReadonlyVec) => (
    (s = isNumber(s) ? [s, s, s] : s),
    setC(m || [], s[0], 0, 0, 0, s[1], 0, 0, 0, s[2])
);

/**
 * Computes M44 scale matrix and writes result to `out`. If `s` is a
 * number, scaling will be uniform.
 *
 * @param m
 * @param s
 */
export const scale44 = (m: Mat, s: number | ReadonlyVec) => (
    (s = isNumber(s) ? [s, s, s] : s),
    setC(
        m || [],
        s[0],
        0,
        0,
        0,
        0,
        s[1],
        0,
        0,
        0,
        0,
        s[2],
        0,
        0,
        0,
        0,
        s[3] !== undefined ? s[3] : 1
    )
);
