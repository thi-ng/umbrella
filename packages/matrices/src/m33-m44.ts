import { setC } from "@thi.ng/vectors/setc";
import type { MatOpM } from "./api";

/**
 * Converts 3x3 to 4x4 matrix and writes result to `out`. Creates new
 * matrix if `out` is `null`.
 *
 * @param out -
 * @param m33 -
 */
export const mat33to44: MatOpM = (out, m33) =>
    setC(
        out || [],
        // x
        m33[0],
        m33[1],
        m33[2],
        0,
        // y
        m33[3],
        m33[4],
        m33[5],
        0,
        // z
        m33[6],
        m33[7],
        m33[8],
        0,
        // w
        0,
        0,
        0,
        1
    );
