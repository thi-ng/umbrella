import type { MultiVecOpV, VecOpV } from "./api";
import { defFnOp } from "./internal/codegen";

export const [exp, exp2, exp3, exp4] = defFnOp<MultiVecOpV, VecOpV>("Math.exp");
