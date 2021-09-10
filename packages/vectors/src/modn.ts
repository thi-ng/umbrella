import { mod as _mod } from "@thi.ng/math/prec";
import type { MultiVecOpVN, VecOpVN } from "./api";
import { ARGS_V, ARGS_VN, defHofOp } from "./internal/codegen";
import { FN_N } from "./internal/templates";

/**
 * Same as {@link mod}, but 2nd operand is a single scalar (uniform domain for
 * all vector components).
 */
export const [modN, modN2, modN3, modN4] = defHofOp<MultiVecOpVN, VecOpVN>(
    _mod,
    FN_N("op"),
    ARGS_VN,
    ARGS_V
);
