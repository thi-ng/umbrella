import { remainder as _remainder } from "@thi.ng/math";
import type { MultiVecOpVV, VecOpVV } from "./api";
import { ARGS_VV, defHofOp } from "./internal/codegen";
import { FN2 } from "./internal/templates";

/**
 * This version of mod uses the same logic as the standard C function
 * `remainder()` (or its equivavalent in the thi.ng/maths package), i.e.
 * componentwise `a - b * round(a / b)`.
 *
 * @remarks
 * Also see {@link @thi.ng/math#remainder}.
 */
export const [remainder, remainder2, remainder3, remainder4] = defHofOp<
    MultiVecOpVV,
    VecOpVV
>(_remainder, FN2("op"), ARGS_VV);
