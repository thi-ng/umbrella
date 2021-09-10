import { set4 } from "@thi.ng/vectors/set";
import type { MatOpM } from "./api";

/**
 * Converts 2x3 to 2x2 matrix and writes result to `out`. Creates new
 * matrix if `out` is `null`.
 *
 * @param out -
 * @param m23 -
 */
export const mat23to22: MatOpM = (out, m23) => set4(out || [], m23);
