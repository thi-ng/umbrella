import type { MultiVecOpVVV, VecOpVVV } from "./api";
import { ARGS_VVV, defOp } from "./internal/codegen";
import { MATH2 } from "./internal/templates";

/**
 * Returns `out = (a + b) * c`.
 *
 * - {@link madd}
 * - {@link subm}
 */
export const [addm, addm2, addm3, addm4] = defOp<MultiVecOpVVV, VecOpVVV>(
    MATH2("+", "*"),
    ARGS_VVV
);
