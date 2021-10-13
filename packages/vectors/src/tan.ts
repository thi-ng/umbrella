import type { MultiVecOpV, VecOpV } from "./api.js";
import { defFnOp } from "./compile/emit.js";

export const [tan, tan2, tan3, tan4] = defFnOp<MultiVecOpV, VecOpV>("Math.tan");
