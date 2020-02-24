import { addN as _addN, addN4 } from "@thi.ng/vectors";
import { defMathN } from "./internal/codegen";
import type { MatOpMN, MultiMatOpMN } from "./api";

/**
 * Adds single scalar componentwise to matrix. If `out` is not given,
 * writes result in `mat`.
 *
 * out = mat + n
 *
 * @param out -
 * @param mat -
 * @param n -
 */
export const addN: MultiMatOpMN = _addN;
export const addN22: MatOpMN = addN4;
export const [addN23, addN33, addN44] = defMathN(addN, "+");
