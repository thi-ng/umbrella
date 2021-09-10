import { setS3 } from "@thi.ng/vectors/sets";
import type { MatOpM } from "./api";

/**
 * Converts 4x4 to 3x3 matrix and writes result to `out`. Creates new
 * matrix if `out` is `null`.
 *
 * @param out -
 * @param m44 -
 */
export const mat44to33: MatOpM = (out, m44) => (
    !out && (out = []),
    setS3(out, m44),
    setS3(out, m44, 3, 4),
    setS3(out, m44, 6, 8)
);
