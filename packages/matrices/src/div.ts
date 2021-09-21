import { div as _div, div4 } from "@thi.ng/vectors/div";
import type { MatOpMM, MultiMatOpMM } from "./api";
import { defMath } from "./compile/emit";

/**
 * Componentwise matrix division. If `out` is not given, writes result
 * in `a`. Both input matrices MUST be of same size.
 *
 * out = a / b
 *
 * @param out -
 * @param a -
 * @param b -
 */
export const div: MultiMatOpMM = _div;
export const div22: MatOpMM = div4;
export const [div23, div33, div44] = defMath(div, "/");
