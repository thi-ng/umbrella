import { set4 } from "@thi.ng/vectors";
import { MatOpM } from "./api";

/**
 * Converts M23 to M22 and writes result to `out`.
 *
 * @param out
 * @param m23
 */
export const mat23to22: MatOpM = (out, m23) => set4(out || [], m23);
