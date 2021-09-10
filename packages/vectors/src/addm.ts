import type { MultiVecOpVVV, VecOpVVV } from "./api";
import { defOp } from "./compile/emit";
import { ARGS_VVV, MATH2 } from "./compile/templates";

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
