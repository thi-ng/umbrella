import { set4 } from "@thi.ng/vectors";
import { MatOpM } from "./api";

/**
 * Converts M22 to M23 and writes result to `out`.
 *
 * @param out
 * @param m22
 */
export const mat22to23: MatOpM = (out, m22) => (
    !out && (out = []), set4(out, m22), (out[4] = out[5] = 0), out
);
