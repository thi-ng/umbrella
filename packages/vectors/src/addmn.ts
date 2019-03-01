import { MultiVecOpVVN, VecOpVVN } from "./api";
import { ARGS_VVN, defOp } from "./internal/codegen";
import { ADDM_N } from "./internal/templates";

/**
 * Returns `out = (a + b) * n`.
 */
export const [addmN, addmN2, addmN3, addmN4] = defOp<MultiVecOpVVN, VecOpVVN>(
    ADDM_N,
    ARGS_VVN
);
