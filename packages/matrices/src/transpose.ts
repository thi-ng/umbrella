import { setC, setC4 } from "@thi.ng/vectors3";
import { MatOpM } from "./api";

/**
 * Writes transposition of M22 `m` to `out`.
 *
 * @param out
 * @param m
 */
export const transpose22: MatOpM =
    (out, m) =>
        setC4(
            out || [],
            m[0], m[2],
            m[1], m[3],
        );

/**
 * Writes transposition of M33 `m` to `out`.
 *
 * @param out
 * @param m
 */
export const transpose33: MatOpM =
    (out, m) =>
        setC(
            out || [],
            m[0], m[3], m[6],
            m[1], m[4], m[7],
            m[2], m[5], m[8],
        );

/**
 * Writes transposition of M44 `m` to `out`.
 *
 * @param out
 * @param m
 */
export const transpose44: MatOpM =
    (out, m) =>
        setC(
            out || [],
            m[0], m[4], m[8], m[12],
            m[1], m[5], m[9], m[13],
            m[2], m[6], m[10], m[14],
            m[3], m[7], m[11], m[15],
        );
