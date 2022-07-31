import type { MultiVecOpV, VecOpV } from "./api.js";
import { defFnOp } from "./compile/emit.js";

export const [ceil, ceil2, ceil3, ceil4] = defFnOp<MultiVecOpV, VecOpV>(
	"Math.ceil"
);
