import { MatOpM } from "./api";

/**
 * Converts M23 to M44 and writes result to `out`.
 *
 * @param out
 * @param m23
 */
export const mat23to44: MatOpM = (out, m23) => (
    !out && (out = []),
    (out[0] = m23[0]),
    (out[1] = m23[1]),
    (out[4] = m23[2]),
    (out[5] = m23[3]),
    (out[12] = m23[4]),
    (out[13] = m23[5]),
    (out[10] = out[15] = 1),
    (out[2] = out[3] = out[6] = out[7] = out[8] = out[9] = out[11] = out[14] = 0),
    out
);
