import type { MultiVecOpV, VecOpV } from "./api";
import { defFnOp } from "./compile/emit";

export const [abs, abs2, abs3, abs4] = defFnOp<MultiVecOpV, VecOpV>("Math.abs");
