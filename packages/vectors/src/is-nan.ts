import type { MultiToBVecOpV, ToBVecOpV } from "./api.js";
import { defFnOp } from "./compile/emit.js";

export const [isNaN, isNaN2, isNaN3, isNaN4] = defFnOp<
	MultiToBVecOpV,
	ToBVecOpV
>("isNaN");
