import type { MultiVecOpV, VecOpV } from "./api.js";
import { defFnOp } from "./compile/emit.js";

export const [sqrt, sqrt2, sqrt3, sqrt4] = defFnOp<MultiVecOpV, VecOpV>(
	"Math.sqrt"
);
