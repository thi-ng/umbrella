import type { MultiVecOpV, VecOpV } from "./api.js";
import { defFnOp } from "./compile/emit.js";

export const [log, log2, log3, log4] = defFnOp<MultiVecOpV, VecOpV>("Math.log");
