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
export const [msubN, msubN2, msubN3, msubN4] = defOp<MultiVecOpVNV, VecOpVNV>(
    MATH2A_N("*", "-"),
    ARGS_VNV,
    ARGS_VV
);
