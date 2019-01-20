import { setS3, setS4, ZERO4 } from "@thi.ng/vectors3";
import { MatOpM } from "./api";

/**
 * Converts M33 to M44 and writes result to `out`.
 *
 * @param out
 * @param m33
 */
export const mat33to44: MatOpM =
    (out, m33) => (
        !out && (out = []),
        setS3(out, m33, 0, 0),
        setS3(out, m33, 4, 3),
        setS3(out, m33, 8, 6),
        setS3(out, ZERO4, 12),
        setS4(out, [0, 0, 0, 1], 3, 0, 4)
    );
