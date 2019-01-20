import { MultiVecOpVVN, VecOpVVN } from "./api";
import { ARGS_VVN, defOp } from "./internal/codegen";
import { SUBM_N } from "./internal/templates";

/**
 * Returns `out = (a - b) * n`.
 */
export const [submN, submN2, submN3, submN4] =
    defOp<MultiVecOpVVN, VecOpVVN>(SUBM_N, ARGS_VVN);
