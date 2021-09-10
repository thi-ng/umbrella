import type { MultiVecOpVNV, VecOpVNV } from "./api";
import { defOp } from "./compile/emit";
import { ARGS_VNV, ARGS_VV, MATH2A_N } from "./compile/templates";

/**
 * Returns `out = a * n + b`.
 *
 * @param out - vec
 * @param a - vec
 * @param n - scalar
 * @param b - vec
 */
export const [maddN, maddN2, maddN3, maddN4] = defOp<MultiVecOpVNV, VecOpVNV>(
    MATH2A_N("*", "+"),
    ARGS_VNV,
    ARGS_VV
);
