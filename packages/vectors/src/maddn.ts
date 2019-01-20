import { MultiVecOpVVN, VecOpVVN } from "./api";
import { ARGS_VVN, defOp } from "./internal/codegen";
import { MADD_N } from "./internal/templates";

/**
 * Returns `out = a + b * n`.
 */
export const [maddN, maddN2, maddN3, maddN4] =
    defOp<MultiVecOpVVN, VecOpVVN>(MADD_N, ARGS_VVN);
