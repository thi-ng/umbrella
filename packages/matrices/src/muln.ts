import { mulN as _mulN, mulN4 } from "@thi.ng/vectors/muln";
import type { MatOpMN, MultiMatOpMN } from "./api.js";
import { defMathN } from "./compile/emit.js";

/**
 * Multiplies matrix componentwise with single scalar. If `out` is not
 * given, writes result in `mat`.
 *
 * out = mat * n
 *
 * @param out -
 * @param mat -
 * @param n -
 */
export const mulN: MultiMatOpMN = _mulN;
export const mulN22: MatOpMN = mulN4;
export const [mulN23, mulN33, mulN44] = defMathN(mulN, "*");
