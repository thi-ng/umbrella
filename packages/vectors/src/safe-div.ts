import { safeDiv as _div } from "@thi.ng/math/safe-div";
import type { MultiVecOpVV, VecOpVV } from "./api";
import { ARGS_VV, defHofOp } from "./internal/codegen";
import { FN2 } from "./internal/templates";

/**
 * Componentwise application of {@link @thi.ng/math#safeDiv}.
 *
 * @param out -
 * @param a -
 * @param b -
 */
export const [safeDiv, safeDiv2, safeDiv3, safeDiv4] = defHofOp<
    MultiVecOpVV,
    VecOpVV
>(_div, FN2("op"), ARGS_VV);
