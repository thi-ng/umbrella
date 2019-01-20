import { setS3 } from "@thi.ng/vectors";
import { MatOpM } from "./api";

/**
 * Converts M44 to M33 and writes result to `out`.
 *
 * @param out
 * @param m44
 */
export const mat44to33: MatOpM =
    (out, m44) => (
        !out && (out = []),
        setS3(out, m44),
        setS3(out, m44, 3, 4),
        setS3(out, m44, 6, 8)
    );
