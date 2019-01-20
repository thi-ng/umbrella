import { mul as _mul, mul4 } from "@thi.ng/vectors3";
import { MatOpMM, MultiMatOpMM } from "./api";
import { defMath } from "./internal/codegen";

/**
 * Componentwise matrix addition. Use `mulM` for actual matrix-matrix
 * multiplication. If `out` is not given, writes result in `a`.
 *
 * out = a * b
 *
 * @param out
 * @param a
 * @param b
 */
export const mul: MultiMatOpMM = _mul;
export const mul22: MatOpMM = mul4;
export const [mul23, mul33, mul44] = defMath(mul, "*");
