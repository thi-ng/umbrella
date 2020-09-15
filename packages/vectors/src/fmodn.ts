import { fmod as _fmod } from "@thi.ng/math";
import type { MultiVecOpVN, VecOpVN } from "./api";
import { ARGS_V, ARGS_VN, defHofOp } from "./internal/codegen";
import { FN_N } from "./internal/templates";

/**
 * Same as {@link fmod}, but 2nd operand is a single scalar (uniform domain
 * for all vector components).
 */
export const [fmodN, fmodN2, fmodN3, fmodN4] = defHofOp<MultiVecOpVN, VecOpVN>(
    _fmod,
    FN_N("op"),
    ARGS_VN,
    ARGS_V
);
