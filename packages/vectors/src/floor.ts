import type { MultiVecOpV, VecOpV } from "./api.js";
import { defFnOp } from "./compile/emit.js";

export const [floor, floor2, floor3, floor4] = defFnOp<MultiVecOpV, VecOpV>(
	"Math.floor"
);
