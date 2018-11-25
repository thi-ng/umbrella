import { MultiVecOpV, VecOpV } from "./api";
import { defFnOp } from "./codegen";

export const [sqrt, sqrt2, sqrt3, sqrt4] =
    defFnOp<MultiVecOpV, VecOpV>("Math.sqrt");
