import type { MultiVecOpV, VecOpV } from "./api.js";
import { defFnOp } from "./compile/emit.js";

export const [abs, abs2, abs3, abs4] = defFnOp<MultiVecOpV, VecOpV>("Math.abs");
