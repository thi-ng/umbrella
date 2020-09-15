import type { MultiVecOpV, VecOpV } from "./api";
import { defFnOp } from "./internal/codegen";

export const [log, log2, log3, log4] = defFnOp<MultiVecOpV, VecOpV>("Math.log");
