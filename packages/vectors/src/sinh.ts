import type { MultiVecOpV, VecOpV } from "./api.js";
import { defFnOp } from "./compile/emit.js";

export const [sinh, sinh2, sinh3, sinh4] = defFnOp<MultiVecOpV, VecOpV>(
	"Math.sinh"
);
