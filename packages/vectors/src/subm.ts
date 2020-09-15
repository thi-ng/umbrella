import type { MultiVecOpVVV, VecOpVVV } from "./api";
import { ARGS_VVV, defOp } from "./internal/codegen";
import { MATH2 } from "./internal/templates";

/**
 * Returns `out = (a - b) * c`.
 *
 * - {@link madd}
 * - {@link addm}
 */
export const [subm, subm2, subm3, subm4] = defOp<MultiVecOpVVV, VecOpVVV>(
    MATH2("-", "*"),
    ARGS_VVV
);
