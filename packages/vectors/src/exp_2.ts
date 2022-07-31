import type { MultiVecOpV, VecOpV } from "./api.js";
import { defOp } from "./compile/emit.js";
import { ARGS_V } from "./compile/templates.js";

/**
 * Componentwise 2^x
 */
export const [exp_2, exp_22, exp_23, exp_24] = defOp<MultiVecOpV, VecOpV>(
	([o, a]) => `${o}=Math.pow(2,${a});`,
	ARGS_V
);
