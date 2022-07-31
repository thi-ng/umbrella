import { set4 } from "@thi.ng/vectors/set";
import type { MatOpM } from "./api.js";

/**
 * Converts 2x2 to 2x3 matrix and writes result to `out`. Creates new
 * matrix if `out` is `null`.
 *
 * @param out -
 * @param m22 -
 */
export const mat22to23: MatOpM = (out, m22) => (
	!out && (out = []), set4(out, m22), (out[4] = out[5] = 0), out
);
