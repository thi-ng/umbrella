import type { MultiVecOpV, VecOpV } from "./api.js";
import { defFnOp } from "./compile/emit.js";

/**
 * Componentwise Math.log2
 */
export const [log_2, log_22, log_23, log_24] = defFnOp<MultiVecOpV, VecOpV>(
	"Math.log2"
);
