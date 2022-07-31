import type { MultiVecOpV, VecOpV } from "./api.js";
import { defFnOp } from "./compile/emit.js";

export const [tanh, tanh2, tanh3, tanh4] = defFnOp<MultiVecOpV, VecOpV>(
	"Math.tanh"
);
