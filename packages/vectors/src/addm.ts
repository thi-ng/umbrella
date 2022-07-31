import type { MultiVecOpVVV, VecOpVVV } from "./api.js";
import { defOp } from "./compile/emit.js";
import { ARGS_VVV, MATH2 } from "./compile/templates.js";

/**
 * Returns `out = (a + b) * c`.
 *
 * - {@link madd}
 * - {@link subm}
 */
export const [addm, addm2, addm3, addm4] = defOp<MultiVecOpVVV, VecOpVVV>(
	MATH2("+", "*"),
	ARGS_VVV
);
