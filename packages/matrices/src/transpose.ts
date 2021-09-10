import { setC, setC4 } from "@thi.ng/vectors/setc";
import type { MatOpM } from "./api";

/**
 * Writes transposition of 2x2 matrix `m` to `out`. Creates new matrix
 * if `out` is `null`
 *
 * @param out -
 * @param m -
 */
export const transpose22: MatOpM = (out, m) =>
    setC4(out || [], m[0], m[2], m[1], m[3]);

/**
 * Writes transposition of 3x3 matrix `m` to `out`. Creates new matrix
 * if `out` is `null`
 *
 * @param out -
 * @param m -
 */
export const transpose33: MatOpM = (out, m) =>
    setC(out || [], m[0], m[3], m[6], m[1], m[4], m[7], m[2], m[5], m[8]);

/**
 * Writes transposition of 4x4 matrix `m` to `out`. Creates new matrix
 * if `out` is `null`
 *
 * @param out -
 * @param m -
 */
export const transpose44: MatOpM = (out, m) =>
    setC(
        out || [],
        m[0],
        m[4],
        m[8],
        m[12],
        m[1],
        m[5],
        m[9],
        m[13],
        m[2],
        m[6],
        m[10],
        m[14],
        m[3],
        m[7],
        m[11],
        m[15]
    );
