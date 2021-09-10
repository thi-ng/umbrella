import { mul as _mul, mul4 } from "@thi.ng/vectors/mul";
import type { MatOpMM, MultiMatOpMM } from "./api";
import { defMath } from "./internal/codegen";

/**
 * Componentwise matrix multiplication. Use {@link mulM} or
 * {@link concat} for actual matrix-matrix multiplication/concatenation.
 * If `out` is not given, writes result in `a`. Both input matrices MUST
 * be of same size.
 *
 * out = a * b
 *
 * @param out -
 * @param a -
 * @param b -
 */
export const mul: MultiMatOpMM = _mul;
export const mul22: MatOpMM = mul4;
export const [mul23, mul33, mul44] = defMath(mul, "*");
