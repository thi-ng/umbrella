import type { MultiVecOpVNV, VecOpVNV } from "./api";
import { ARGS_VNV, ARGS_VV, defOp } from "./internal/codegen";
import { MATH2A_N } from "./internal/templates";

/**
 * Returns `out = a * n + b`.
 *
 * @param out - vec
 * @param a - vec
 * @param n - scalar
 * @param b - vec
 */
export const [msubN, msubN2, msubN3, msubN4] = defOp<MultiVecOpVNV, VecOpVNV>(
    MATH2A_N("*", "-"),
    ARGS_VNV,
    ARGS_VV
);
