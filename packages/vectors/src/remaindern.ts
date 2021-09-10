import { remainder as _remainder } from "@thi.ng/math/libc";
import type { MultiVecOpVN, VecOpVN } from "./api";
import { ARGS_V, ARGS_VN, defHofOp } from "./internal/codegen";
import { FN_N } from "./internal/templates";

/**
 * Same as {@link remainder}, but 2nd operand is a single scalar (uniform domain
 * for all vector components).
 */
export const [remainderN, remainderN2, remainderN3, remainderN4] = defHofOp<
    MultiVecOpVN,
    VecOpVN
>(_remainder, FN_N("op"), ARGS_VN, ARGS_V);
