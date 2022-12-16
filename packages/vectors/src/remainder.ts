import { remainder as _remainder } from "@thi.ng/math/libc";
import type { MultiVecOpVV, VecOpVV } from "./api.js";
import { defHofOp } from "./compile/emit.js";
import { ARGS_VV, FN2 } from "./compile/templates.js";

/**
 * This version of mod uses the same logic as the standard C function
 * `remainder()` (or its equivavalent in the thi.ng/maths package), i.e.
 * componentwise `a - b * round(a / b)`.
 *
 * @remarks
 * Also see
 * [`remainder()`](https://docs.thi.ng/umbrella/math/functions/remainder.html).
 */
export const [remainder, remainder2, remainder3, remainder4] = defHofOp<
	MultiVecOpVV,
	VecOpVV
>(_remainder, FN2("op"), ARGS_VV);
