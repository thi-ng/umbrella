import type { MultiVecOpVVN, VecOpVVN } from "./api";
import { ARGS_VVN, defOp } from "./internal/codegen";
import { MATH2_N } from "./internal/templates";

/**
 * Returns `out = (a - b) * n`.
 */
export const [submN, submN2, submN3, submN4] = defOp<MultiVecOpVVN, VecOpVVN>(
    MATH2_N("-", "*"),
    ARGS_VVN
);
