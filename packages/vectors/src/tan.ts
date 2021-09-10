import type { MultiVecOpV, VecOpV } from "./api";
import { defFnOp } from "./compile/emit";

export const [tan, tan2, tan3, tan4] = defFnOp<MultiVecOpV, VecOpV>("Math.tan");
