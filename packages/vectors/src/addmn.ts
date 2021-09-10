import type { MultiVecOpVVN, VecOpVVN } from "./api";
import { defOp } from "./compile/emit";
import { ARGS_VVN, MATH2_N } from "./compile/templates";

/**
 * Returns `out = (a + b) * n`.
 */
export const [addmN, addmN2, addmN3, addmN4] = defOp<MultiVecOpVVN, VecOpVVN>(
    MATH2_N("+", "*"),
    ARGS_VVN
);
