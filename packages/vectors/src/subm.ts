import type { MultiVecOpVVV, VecOpVVV } from "./api.js";
import { defOp } from "./compile/emit.js";
import { ARGS_VVV, MATH2 } from "./compile/templates.js";

/**
 * Returns `out = (a - b) * c`.
 *
 * - {@link madd}
 * - {@link addm}
 */
export const [subm, subm2, subm3, subm4] = defOp<MultiVecOpVVV, VecOpVVV>(
	MATH2("-", "*"),
	ARGS_VVV
);
