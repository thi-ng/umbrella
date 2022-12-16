import { safeDiv as _div } from "@thi.ng/math/safe-div";
import type { MultiVecOpVV, VecOpVV } from "./api.js";
import { defHofOp } from "./compile/emit.js";
import { ARGS_VV, FN2 } from "./compile/templates.js";

/**
 * Componentwise application of
 * [`safeDiv()`](https://docs.thi.ng/umbrella/math/functions/safeDiv.html).
 *
 * @param out -
 * @param a -
 * @param b -
 */
export const [safeDiv, safeDiv2, safeDiv3, safeDiv4] = defHofOp<
	MultiVecOpVV,
	VecOpVV
>(_div, FN2("op"), ARGS_VV);
