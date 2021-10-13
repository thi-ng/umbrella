import { isNumber } from "@thi.ng/checks/is-number";
import { setC, setC4, setC6 } from "@thi.ng/vectors/setc";
import type { MatOpNV } from "./api.js";

/**
 * Computes 2x2 matrix scale matrix and writes result to `out`. If `s`
 * is a number, scaling will be uniform.
 *
 * @param m -
 * @param s -
 */
export const scale22: MatOpNV = (m, s) => (
    (s = isNumber(s) ? [s, s] : s), setC4(m || [], s[0], 0, 0, s[1])
);

/**
 * Computes 2x3 matrix scale matrix and writes result to `out`. If `s`
 * is a number, scaling will be uniform.
 *
 * @param m -
 * @param s -
 */
export const scale23: MatOpNV = (m, s) => (
    (s = isNumber(s) ? [s, s] : s), setC6(m || [], s[0], 0, 0, s[1], 0, 0)
);

/**
 * Computes 3x3 matrix scale matrix and writes result to `out`. If `s`
 * is a number, scaling will be uniform.
 *
 * @param m -
 * @param s -
 */
export const scale33: MatOpNV = (m, s) => (
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
export const scale44: MatOpNV = (m, s) => (
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
