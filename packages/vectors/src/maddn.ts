import { MultiVecOpVNV, VecOpVNV } from "./api";
import { ARGS_VNV, ARGS_VV, defOp } from "./internal/codegen";
import { MADD_N } from "./internal/templates";

/**
 * Returns `out = a * n + b`.
 *
 * @param out
 * @param a
 * @param n
 * @param b
 */
export const [maddN, maddN2, maddN3, maddN4] = defOp<MultiVecOpVNV, VecOpVNV>(
    MADD_N,
    ARGS_VNV,
    ARGS_VV
);
