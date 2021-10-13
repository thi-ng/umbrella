import type { MultiVecOpV, VecOpV } from "./api.js";
import { defFnOp } from "./compile/emit.js";

export const [cos, cos2, cos3, cos4] = defFnOp<MultiVecOpV, VecOpV>("Math.cos");
