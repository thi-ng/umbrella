import type { MultiVecOpV, VecOpV } from "./api.js";
import { defFnOp } from "./compile/emit.js";

export const [sin, sin2, sin3, sin4] = defFnOp<MultiVecOpV, VecOpV>("Math.sin");
